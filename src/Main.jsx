import BirthdayCard from "./BirthdayCard"
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import Spinner from './Spinner'

export default function Main() {
  const [friends, setFriends] = useState([])
  const [name, setName] = useState('');
  const [dob, setDob] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData();
    form.set("name", name);
    form.set("birthday", dob);
    form.set("message", message);
    form.set("image", file);

    if (pin === "2002") {
      if (name && dob && file) {
        setLoading(true)
        axios.post("https://52.62.230.74/friend/create", form, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res) => {
          setLoading(false)
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
            setFile('')
            document.getElementById("friendimg").value = "";
            axios.get("https://52.62.230.74/friends")
              .then((resp) => {
              })
              .catch((err) => {
                console.log(err);
              });
          })
        }).catch((error) => {
          setLoading(false)
          console.log(error.message)
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Name, Birthday & Picture are required',
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false
        })
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'PIN is not correct',
        footer: '<a href="https://yasir2002.github.io/">Contact developer</a>'
      })
    }
  }


  useEffect(() => {
    axios.get("https://52.62.230.74/friends")
      .then((resp) => {
        setFriends(resp.data.friends)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])




  return (
    <>
      <div className="center-container my-5">
        <h1 className="text-center mb-5">Birthdays Remainder</h1>
        <div className="row" >
            <BirthdayCard key={friends._id} friends={friends} />
        </div>
      </div>


      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: "#4E6E81" }}>
            <div className="modal-body">
              <form action="">
                <label htmlFor="pin" className="text-light ms-2">Enter the PIN provided</label>
                <input value={pin} id="pin" type="number" onChange={(e) => { setPin(e.target.value) }} placeholder="XXXX" className="form-control rounded-pill mb-2" />

                <label htmlFor="name" className="text-light ms-2">Enter your name</label>
                <input value={name} type="text" onChange={(e) => { setName(e.target.value) }} placeholder="John Doe" className="form-control rounded-pill mb-2" />

                <label htmlFor="name" className="text-light ms-2">Enter your birthday</label>
                <input value={dob} type="date" onChange={(e) => { setDob(e.target.value) }} placeholder="Enter your birthday" className="form-control rounded-pill mb-2" />

                <label htmlFor="name" className="text-light ms-2">Select your picture</label>
                <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} accept="image/*" className="form-control rounded-pill mb-2" id="friendimg" />


                <textarea value={message} type="text" onChange={(e) => { setMessage(e.target.value) }} placeholder="Enter a short message for developer (optional)" className="form-control rounded mt-4" />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger rounded-pill px-5 shadow" data-bs-dismiss="modal"><i className="fa fa-xmark"></i></button>
              <button type="button" className="btn btn-success rounded-pill px-5 shadow position-relative" onClick={handleSubmit}><i className="fa fa-check"></i>{loading && <Spinner />}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}