import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAllEmployees, createEmployee as createEmployeeApi, updateEmployee as updateEmployeeApi, deleteEmployee as deleteEmployeeApi } from "../apis/employeeApis"
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

    const updateMutation = useMutation({
        mutationFn: ({ id, updateData }) => updateEmployeeApi(id, updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            toast.success("Employee updated successfully!")
        },
        onError: (err) => {
            console.error("Error updating employee:", err)
            toast.error(err.response?.data?.message || err.message || "Failed to update employee.")
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteEmployeeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
            toast.success("Employee deleted successfully!")
        },
        onError: (err) => {
            console.error("Error deleting employee:", err)
            toast.error(err.response?.data?.message || err.message || "Failed to delete employee.")
        }
    })

    return {
        isPending,
        data,
        error,
        createEmployee: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        updateEmployee: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        deleteEmployee: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending
    }
}

export default useEmployees