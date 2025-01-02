import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'

export const TermsModal = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(
        !Boolean(localStorage.getItem('username-alert-showed'))
    )
    const handleAccept = () => {
        localStorage.setItem('username-alert-showed', 'true')
        setOpen(false)
        navigate('/settings')
    }

    const handleCancel = () => {
        setOpen(false)
        navigate('/settings')
    }
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className='w-[444px] bg-gradient-to-r from-[#9a9a9a] to-[#343434] rounded-[10px] p-0 border-none'>
                <AlertDialogHeader>
                    <AlertDialogTitle className=' bg-[#202020] rounded-t-[5px] text-center text-white text-xs font-normal py-2'>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-[#ffffff] p-2'>
                        You are now part of a strategic universe where technology and
                        teamwork are key. Your mission: Build, research, conquer – and
                        lead your robotant colony to greatness!
                        <br />
                        <br />
                        Before you begin, please choose your username.
                        <br />
                        <span className='text-[#ff0000] text-sm'> Note:</span> This
                        <u> username cannot be changed</u> later, so think carefully about
                        how you want to be known in the RobotAnt world.
                        <br />
                        <br />
                        Your starting planet will be assigned based on the amount of RANT
                        tokens hold in your connected Sol wallet. The more RANT tokens you
                        own, the larger your planet will be – giving you access to more
                        resources for farming and development. Take advantage of this to
                        grow your colony faster!
                        <br />
                        <br />
                        We value fair play and mutual respect. Insults, threats, or
                        disrespectful behavior in messages are strictly prohibited.
                        <br />
                        <br />
                        Let’s ensure a positive experience for everyone!
                        <br />
                        <br />
                        Get ready – your journey begins now!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className='w-full flex justify-between px-4 pb-2'>
                        <button className='text-[#ff0000] text-sm' onClick={handleCancel}>
                            [Cancel]
                        </button>
                        <button className='text-[#05ff00] text-sm' onClick={handleAccept}>
                            [Accept]
                        </button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
