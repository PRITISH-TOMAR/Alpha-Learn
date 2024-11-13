import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { setUser } from '../Redux/UserSlice'
import axios from "axios";
import { app } from './Firebase';
import { Button } from "@material-tailwind/react";
import { DriveFileRenameOutline } from "@mui/icons-material";
import toast from 'react-hot-toast'

export default function Auth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    ///////////////////////////////////////////////////////////////


    function updateUrl() {
        // Get the current URL
        const currentUrl = window.location.href;

        // Retrieve the previous URL from the history stack
        window.history.back();

        // Get the updated URL after navigating back
        const updatedUrl = window.location.href;

        // Check if the previous URL is different from the current URL
        if (updatedUrl !== currentUrl) {
            window.location.replace(updatedUrl);
        } else {
            navigate("/")
        }
    }
    ///////////////////////////////////////////////////////////////


    const handleGoogleClick = async () => {
        const Provider = new GoogleAuthProvider();
        Provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, Provider);

            const user = { fullName: resultsFromGoogle.user.displayName, email: resultsFromGoogle.user.email, profilePicture: resultsFromGoogle.user.photoURL, };

            const res = await axios.post(`${process.env.REACT_APP_API_END}google`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true

            });
            // console.log(res.data)
            if (res.data.success) {
                toast.success(res.data.message);
                // console.log(res.data.user)
                dispatch(setUser(res.data.user));
                //  navigate('/')
                updateUrl()
            }
        } catch (error) {
            console.log('error is ', error);
        }
    }



    ///////////////////////////////////////////////////////////////

    return (
        <>
            <Button



                onClick={handleGoogleClick}
                variant="outlined"
                className="md:text-[14px] text-[10px] p-1 items-center `sm`:gap-0 gap-3 mt-2 mb-2 w-[50%] bg-[#000000] text-white flex justify-center "

            // sx={{
            //     mt: 2, mb: 2, width: '50%', bgcolor: '#002000', color: 'white', display: 'flex', justifyContent: 'space-between', '&:hover': {
            //         bgcolor: 'black', // Change to the desired hover background color
            //         color: '#FFFFFF', // Change to the desired hover text color
            //         // opacity:'80%'

            //     }
            // }}
            > Continue With
                <img src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="" width="30px" height="30px" />
            </Button>
        </>
    )
} 