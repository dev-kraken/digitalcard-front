import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosAuthServer from "@/lib/axios/axios-auth";
import {toast} from "sonner";
export const useAllCards = () => {
    return useQuery({
        queryKey: ['allCards'],
        queryFn: () => axiosAuthServer.card.allCards(),
    })
};
export const useCreateCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (data: any) => await axiosAuthServer.card.addCard(data.cardAdd),
            onSuccess: () => {
                toast.success("Card has been created");
                queryClient.invalidateQueries({queryKey: ['allCards']})
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};

export const useDeleteCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (cardID: any) => await axiosAuthServer.card.cardDelete(cardID),
            onSuccess: () => {
                toast.error('Card has been deleted')
                queryClient.invalidateQueries({queryKey: ['allCards']})
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};

export const useSetCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (dataSetCard: any) => await axiosAuthServer.client.setCardStyle(dataSetCard.dataSetCard),
            onSuccess: () => {
                toast.success("Card has been selected");
                queryClient.invalidateQueries({queryKey: ['getCardStyle']})
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};

export const useAllSocialMedia = () => {
    return useQuery({
        queryKey: ['allSocialMedia'],
        queryFn: () => axiosAuthServer.socialMedia.allSocialMedia(),
    })
};

export const useGetSocialMedia = (cardID:string) => {
    return useQuery({
        queryKey: ['getSocialMedia'],
        queryFn: () => axiosAuthServer.socialMedia.getSocialByID(cardID),
    })
};

export const useGetState = () => {
    return useQuery({
        queryKey: ['getAllState'],
        queryFn: () => axiosAuthServer.countryData.getAllState(),
    })
};

export const useGetProfile = (cardID:string) => {
    return useQuery({
        queryKey: ['getCardProfile'],
        queryFn: () => axiosAuthServer.card.getCardProfile(cardID),
    })
};
export const useGetStyle = (cardID:string) => {
    return useQuery({
        queryKey: ['getCardStyle'],
        queryFn: () => axiosAuthServer.client.getStyleByID(cardID),
    })
};

export const useSetCardProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (dataProfile: any) => await axiosAuthServer.card.cardProfile(dataProfile.cardAdd),
            onSuccess: () => {
                toast.success("Profile has been added");
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};

export const useSetListing = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (dataListing: any) => await axiosAuthServer.client.setListing(dataListing.dataValues),
            onSuccess: () => {
                toast.success("Listing has been added");
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};

export const useSetSocialMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (dataSetMedia: any) => await axiosAuthServer.socialMedia.setSocialMedia(dataSetMedia.data),
            onSuccess: () => {
                toast.success("Media has been added");
                queryClient.invalidateQueries({queryKey: ['getSocialMedia']})
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};