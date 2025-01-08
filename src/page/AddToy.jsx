import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { collection, addDoc, } from 'firebase/firestore'
import { dbFireStore } from '../config/firebase'
import { Link } from 'react-router-dom'
import { useFireAuthContext } from '../config/FireAuthContext';
import { uploadService } from '../service/imageService'
export function AddToy({ onUploaded = null }) {
  let inputRef = useRef(null)
  let priceRef = useRef(null)
  let infoRef = useRef(null)
  const { userFire } = useFireAuthContext();
  const userId = userFire?.uid;
  const userName = userFire?.email ? getNameFromEmail() : ''
  const navigate = useNavigate()
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  function getNameFromEmail() {
    let greet = ''
    const index = userFire.email.indexOf('@')
    greet += userFire.email.slice(0, index)
    return greet
  }



  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }


  async function handleSubmit(e) {
    e.preventDefault()
    if (!inputRef.current.value || !priceRef.current.value || !infoRef.current.value || !imgData.imgUrl) {
      alert('enter valid inputs pls')
      return
    }
    if (!userId) {
      alert('you must login to add a new Toy!')
      return
    }
    try {
      const newToy = {
        name: inputRef.current.value,
        price: +priceRef.current.value,
        info: infoRef.current.value,
        _id: Date.now(),
        userId,
        userName,
        imgUrl: imgData.imgUrl
      }
      const ref = collection(dbFireStore, 'toys')
      const data = await addDoc(ref, newToy)
      navigate('/')
    } catch (error) {
      alert('cant add new toy to database')
      console.log(error, 'ERROR!')
    }
    inputRef.current.value = ''
    priceRef.current.value = ''
    infoRef.current.value = ''
  }
  console.log('imgData.imgUrl:', imgData.imgUrl)
  return (
    <form onSubmit={handleSubmit} className='bg-zinc-200 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-center text-5xl'>Add a new toy form:</h1>
      <div className='flex flex-col sm:flex-row items-center gap-5 justify-center mt-5'>
        <label htmlFor="name">name:</label>
        <input type="text" ref={inputRef} />

        <label htmlFor="price">price:</label>
        <input type="number" ref={priceRef} />

        <label htmlFor="info">info:</label>
        <input type="text" ref={infoRef} />

        <div className="flex flex-col sm:flex-row items-center">
          {imgData.imgUrl && <img src={imgData.imgUrl} className='max-w-24' />}
          <label htmlFor="imgUpload">{getUploadLabel()}</label>
          <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
        </div>
      </div>

      <button type='submit' className='bg-sky-400 px-2 my-5 flex mx-auto btn'>Add new Toy</button>
      <Link to={'/'} className='bg-violet-400 btn'>Back</Link>
    </form>
  )
}

