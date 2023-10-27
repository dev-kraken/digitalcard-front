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
                queryClient.invalidateQueries({queryKey: ['allCards']})
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};