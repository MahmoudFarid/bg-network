import { useState, useEffect } from 'react'
import API from '../api'
import BasicDataForm from '../components/forms/basicDataForm'
import PasswordForm from '../components/forms/passwordForm'

export default function Settings() {
  const [profile, setProfile] = useState({})
  const [isBasicData, setIsBasicData] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      const { data } = await API.get('users/me/')
      setProfile(data)
    }
    fetchProfile()
  }, [])

  return (
    <div className="container-fluid my-16">
      <h2 className="text-black font-bold text-lg mb-5">Settings</h2>
      <div className="flex justify-between">
        <div className="w-2/12 h-32 bg-bgLightest shadow-lg rounded-lg">
          <div
            className={`p-5 ${
              isBasicData ? 'bg-white hover:bg-white' : ' cursor-pointer hover:bg-bgLight'
            } `}
            onClick={() => setIsBasicData(true)}>
            <p className="">Basic data</p>
          </div>
          <div
            className={`p-5 ${
              !isBasicData ? 'bg-white hover:bg-white' : ' cursor-pointer hover:bg-bgLight'
            } `}
            onClick={() => setIsBasicData(false)}>
            <p className="">Password</p>
          </div>
        </div>
        <div className="form relative w-9/12 bg-white py-5 shadow-lg rounded-lg">
          {isBasicData ? <BasicDataForm profile={profile} /> : <PasswordForm profile={profile} />}
        </div>
      </div>
      <style jsx>{`
        .form {
          min-height: 29rem;
        }
      `}</style>
    </div>
  )
}
