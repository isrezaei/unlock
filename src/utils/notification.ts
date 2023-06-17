import {toast} from "react-toastify";


export const notification = (id: any, type: any, message: string) => {
    return toast.update(id, {
            type,
            render: message,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            isLoading: false
        }
    )
}