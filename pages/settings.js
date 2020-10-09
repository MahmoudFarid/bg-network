import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import API from '../api'
import PasswordForm from '../components/forms/passwordForm'
import BasicDataForm from '../components/forms/basicDataForm'
import SettingsSkeleton from './../components/skeletons/settingsSkeleton'

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
      <div className="container my-12">
        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          <div>
            <h2 className="text-black font-bold text-md mb-3">Profile</h2>
            <div className="flex justify-between">
              <div className="menu w-1/5 bg-bgLightest text-primary text-sm shadow-lg rounded-lg">
                <div
                  className={`p-4 border-b border-gray-300 ${
                    isBasicData ? 'bg-white hover:bg-white' : ' cursor-pointer hover:bg-bgLight'
                  } `}
                  onClick={() => setIsBasicData(true)}>
                  <p>Basic data</p>
                </div>
                <div
                  className={`p-4 border-b border-gray-300 ${
                    !isBasicData ? 'bg-white hover:bg-white' : ' cursor-pointer hover:bg-bgLight'
                  } `}
                  onClick={() => setIsBasicData(false)}>
                  <p>Password</p>
                </div>
                <div
                  className="p-4 cursor-pointer hover:bg-bgLight"
                  onClick={() => Router.push('/profile')}>
                  <p>View profile as</p>
                </div>
              </div>
              <div className="form relative w-9/12 bg-white py-5 shadow-lg rounded-lg">
                {isBasicData ? <BasicDataForm profile={profile} /> : <PasswordForm />}
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .form {
          min-height: 29rem;
        }
        .menu {
          height: 10rem;
        }
      `}</style>
    </div>
  )
}
