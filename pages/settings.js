import Head from 'next/head'
import { useState, useEffect } from 'react'
import API from '../api'
import BasicDataForm from '../components/forms/basicDataForm'
import PasswordForm from '../components/forms/passwordForm'
import Loading from '../components/core/loading'

export default function Settings() {
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isBasicData, setIsBasicData] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      await API.get('users/me/').then((res) => {
        setProfile(res.data)
        setIsLoading(false)
      })
    }
    fetchProfile()
  }, [])

  return (
    <div>
      <Head>
        <title>Profile Settings</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container my-12">
          <h2 className="text-black font-bold text-md mb-3">Settings</h2>
          <div className="flex justify-between">
            <div className="menu w-1/5 bg-bgLightest text-primary text-sm shadow-lg rounded-lg">
              <div
                className={`p-4 ${
                  isBasicData ? 'bg-white hover:bg-white' : ' cursor-pointer hover:bg-bgLight'
                } `}
                onClick={() => setIsBasicData(true)}>
                <p className="">Basic data</p>
              </div>
              <div
                className={`p-4 ${
                  !isBasicData ? 'bg-white hover:bg-white' : ' cursor-pointer hover:bg-bgLight'
                } `}
                onClick={() => setIsBasicData(false)}>
                <p className="">Password</p>
              </div>
            </div>
            <div className="form relative w-9/12 bg-white py-5 shadow-lg rounded-lg">
              {isBasicData ? <BasicDataForm profile={profile} /> : <PasswordForm />}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .form {
          min-height: 29rem;
        }
        .menu {
          height: 6.5rem;
        }
      `}</style>
    </div>
  )
}
