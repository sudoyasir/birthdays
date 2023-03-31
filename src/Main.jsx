import BirthdayCard from "./BirthdayCard"
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

export default function Main() {
    const [friends, setFriends] = useState('')


    useEffect(() => {
        axios.get("https://yasirs-birthday-remainder.herokuapp.com/friends")
            .then((resp) => {
                console.log(resp.data.friends)
                setFriends(resp.data.friends)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    const [name, setName] = useState('');
    const [dob, setDob] = useState('')
    const [message, setMessage] = useState('')
    const [pin, setPin] = useState('')


    const friend = {
        name: name,
        birthday: dob,
        message: message
    }

    const handleSubmit = () => {
        if (pin === '2002') {
            if (name && dob) {
                axios.post("https://yasirs-birthday-remainder.herokuapp.com/friend/create", friend)
                    .then((resp) => {
                        console.log(resp)
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${name} you have been added!`,
                            showConfirmButton: false,
                            timer: 1800,
                            timerProgressBar: true
                        }).then((res) => {
                            setPin('')
                            setName('')
                            setDob('')
                            setMessage('')
                            
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Missing Fields!",
                    text: "Please enter your name and birthday to continue.",
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: "Invalid PIN!",
                text: "PIN provided was not correct, try again with correct PIN or contact me to get if you don't have one",
                footer: '<a href="https://yasir2002.github.io/" target="_blank">Contact Me</a>'
            })
        }
    }
    
    return (
        <>
            <div className="center-container my-5">
                <h1 className="text-center mb-5">Birthdays Remainder</h1>
                <div className="row" >
                    <BirthdayCard friends={friends} />
                </div>
            </div>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Your Birthday</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <input value={pin} type="number" onChange={(e) => { setPin(e.target.value) }} placeholder="Enter PIN provided by Yasir" className="form-control rounded-pill mb-2" />
                                <input value={name} type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Enter your name here" className="form-control rounded-pill mb-2" />
                                <input value={dob} type="date" onChange={(e) => { setDob(e.target.value) }} placeholder="Enter your birthday" className="form-control rounded-pill mb-2" />
                                <input value={message} type="text" onChange={(e) => { setMessage(e.target.value) }} placeholder="Enter a short message for developer (optional)" className="form-control rounded-pill" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger rounded-circle shadow" data-bs-dismiss="modal"><i className="fa fa-xmark"></i></button>
                            <button type="button" className="btn btn-success rounded-circle shadow" onClick={handleSubmit}><i className="fa fa-check"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}