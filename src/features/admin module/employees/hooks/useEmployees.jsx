import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllEmployees, createEmployee as createEmployeeApi } from "../apis/employeeApis"
import { toast } from "react-hot-toast"

const useEmployees = () => {
    const queryClient = useQueryClient()

    const { isPending, data, error } = useQuery({
        queryKey: ["employees"],
        queryFn: getAllEmployees,
        staleTime: 100000
    })

    const createMutation = useMutation({
        mutationFn: createEmployeeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            toast.success("Employee added successfully!")
        },
        onError: (err) => {
            console.error("Error creating employee:", err)
            toast.error(err.response?.data?.message || err.message || "Failed to add employee.")
        }
    })

    return {
        isPending,
        data,
        error,
        createEmployee: createMutation.mutateAsync,
        isCreating: createMutation.isPending
    }
}

export default useEmployees