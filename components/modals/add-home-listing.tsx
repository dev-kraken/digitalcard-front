'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axiosAuth from '@/lib/axios/axios-auth';
import { AllState } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useSetListing } from '@/hooks/query';
import { useParams } from 'next/navigation';
import {
  useGetAllStateQuery,
  useSetListingMutation,
} from '@/redux/services/cardApi';
import { toast } from 'sonner';
import Image from "next/image";

const formSchema = z.object({
  street: z.string().min(1, {
    message: 'Street is required.',
  }),
  city: z.string().min(1, {
    message: 'City is required.',
  }),
  stateId: z.string().min(1, {
    message: 'State is required',
  }),
  zipcode: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  propertyType: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  price: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  bedrooms: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  bathrooms: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  squareFootage: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  lotSize: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  yearBuilt: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  countryId: z.string().min(1, {
    message: 'Zip Code is required',
  }),
  description: z.string().min(0),
  circle_image: z.any(),
});

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );
  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

export const AddHomeListing = () => {
  const params = useParams();
  const [preview, setPreview] = useState<FileList | null>(null);
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === 'addHomeListing';
  const [isMounted, setIsMounted] = useState(false);
  const { mutate: addMutate } = useSetListing();
  const [setListing] = useSetListingMutation();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryId: '',
      city: '',
      street: '',
      description: '',
      stateId: '',
      zipcode: '',
      propertyType: '',
      price: '',
      yearBuilt: '',
      squareFootage: '',
      bedrooms: '',
      bathrooms: '',
      lotSize: '',
      circle_image: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  function fileToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // @ts-ignore
        const base64String = event.target.result;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let listListingPhoto: never[] = [];
    for (let i = 0; i < values.circle_image?.length; i++) {
      let dataImg = {
        listingImageOrg: values.circle_image[i].name,
        listingImageBase64: await fileToBase64(values.circle_image?.[i]),
        isDefault: values.circle_image[i] === 0,
      };
      // @ts-ignore
      listListingPhoto.push(dataImg)
    }

    const dataValues = { ...values, cardGuid: params.cardID, listListingPhoto };
    try {
      const resListing = await setListing(dataValues).unwrap();
      console.log(resListing);

      if (resListing.success) {
        form.reset();
        onClose();
        toast.success('added');
      }
    } catch (err) {
      toast.success('Wrror');
    }
  };
  const handelClose = () => {
    form.reset();
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <div>Is Loading</div>;
  }
  // @ts-ignore
  const files = preview ? [...preview] : [];

  console.log(files)
  return (
    <Dialog open={isModalOpen} onOpenChange={handelClose}>
      <DialogContent className='max-w-4xl overflow-hidden bg-white p-0 text-black'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-center text-2xl font-bold'>
            Add New Listing
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-4 px-6'>
              <div className='grid grid-cols-3 gap-3'>
                {files && files.map((file, i) => (
                    <div key={i}>
                      <Image src={URL.createObjectURL(file)} alt={file.name} width="150" height="100" />
                    </div>
                ))}
                <div>
                  <FormField
                    control={form.control}
                    name='circle_image'
                    render={({ field: { onChange, value, ...rest } }) => (
                      <>
                        <FormItem>
                          <FormControl>
                            <div className='flex w-full items-center justify-center'>
                              <label
                                htmlFor='dropzone-file'
                                className='dark:hover:bg-bray-800 flex h-40 w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                              >
                                <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                                  <svg
                                    className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-400'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 20 16'
                                  >
                                    <path
                                      stroke='currentColor'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                    />
                                  </svg>
                                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                                    <span className='font-semibold'>
                                      Click to upload
                                    </span>{' '}
                                    or drag and drop
                                  </p>
                                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                                    PNG, JPG or SVG
                                  </p>
                                </div>
                                <Input
                                  id='dropzone-file'
                                  type='file'
                                  multiple
                                  {...rest}
                                  onChange={(event) => {
                                    const { files, displayUrl } =
                                      getImageData(event);
                                    onChange(files);
                                    setPreview(files);
                                  }}
                                  className='hidden'
                                />
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className='grid grid-cols-3 gap-3'>
                <div>
                  <FormField
                    control={form.control}
                    name='propertyType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Property Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Property Type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>Home</SelectItem>
                            <SelectItem value='2'>TownHome</SelectItem>
                            <SelectItem value='3'>Multi-Family</SelectItem>
                            <SelectItem value='4'>Condos/Co-ops</SelectItem>
                            <SelectItem value='5'>Lots/Land</SelectItem>
                            <SelectItem value='6'>Apartments</SelectItem>
                            <SelectItem value='7'>Manufactured</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter Price'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='yearBuilt'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Year Built
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter Year Built'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='grid grid-cols-4 gap-3'>
                <div>
                  <FormField
                    control={form.control}
                    name='squareFootage'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Square Footage
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter Square Footage'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='bedrooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Bedrooms
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter Bedrooms'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='bathrooms'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Bathrooms
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter  Bathrooms'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='lotSize'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Lot Size
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter Lot Size'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='grid grid-cols-5 gap-3'>
                <div>
                  <FormField
                    control={form.control}
                    name='countryId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Country
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Country' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='1'>United States</SelectItem>
                            <SelectItem value='2'>Canada</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-2'>
                  <FormField
                    control={form.control}
                    name='street'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Street
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter Street'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-2'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter City'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='stateId'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          State
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='State' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <ScrollArea className='h-72 w-48'>
                              <SelectItem value='sf'>S</SelectItem>
                              {data.allStates &&
                                data.allStates.map((state) => (
                                  <SelectItem
                                    key={state.name}
                                    className='text-rose-500'
                                    value={state.id.toString()}
                                  >
                                    {state.name}
                                  </SelectItem>
                                ))}
                            </ScrollArea>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='zipcode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className='border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Enter ZipCode'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Tell us a little bit about yourself'
                            className='resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button variant='default' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
