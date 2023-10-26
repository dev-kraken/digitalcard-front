import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axiosAuthServer from "@/lib/axios/axios-auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                toast("Card Created",{ hideProgressBar: true, autoClose: 2000, type: 'success', position: 'bottom-center' });
                queryClient.invalidateQueries({queryKey: ['allCards']})
            },
            onError: (error) => {
                console.log(error)
            }
        }
    );
};