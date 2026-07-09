import { useQuery } from "@tanstack/react-query"
import { getAllEmployees } from "../apis/employeeApis"

const useEmployees = () => {
    const { isPending, data } = useQuery({
        queryKey: ["employees"],
        queryFn: getAllEmployees,
        staleTime: 100000
    })

    return {
        isPending, data
    }
}

export default useEmployees