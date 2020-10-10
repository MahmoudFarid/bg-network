import Head from 'next/head'
import { useState, useEffect } from 'react'
import API from '../api'
import TeamManagement from './../components/teamManagement'
import BasicDataForm from '../components/forms/basicDataForm'
import SettingsSkeleton from './../components/skeletons/settingsSkeleton'

export default function Settings() {
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isBasicData, setIsBasicData] = useState(true)

  useEffect(() => {
    // This is for Testing !!!
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
        <title>Account Management</title>
      </Head>
      <div className="container my-12">
        {isLoading ? (
          <SettingsSkeleton />
        ) : (
          <div>
            <h2 className="text-black font-bold text-md mb-3">Company</h2>
            <div className="block lg:flex lg:justify-between">
              <div className="w-full menu bg-white text-sm shadow-lg rounded-lg mb-5 lg:w-1/5">
                <div
                  className={`p-4 border-b border-gray-300 ${
                    isBasicData
                      ? 'text-primaryText font-semibold'
                      : ' cursor-pointer text-primary hover:text-primaryText'
                  } `}
                  onClick={() => setIsBasicData(true)}>
                  <p>Basic data</p>
                </div>
                <div
                  className={`p-4 ${
                    !isBasicData
                      ? 'text-primaryText font-semibold'
                      : ' cursor-pointer text-primary hover:text-primaryText'
                  } `}
                  onClick={() => setIsBasicData(false)}>
                  <p>Team Management</p>
                </div>
              </div>
              <div className="w-full form relative bg-white py-5 shadow-lg rounded-lg lg:w-9/12">
                {isBasicData ? (
                  <BasicDataForm profile={profile} isCompany={true} />
                ) : (
                  <TeamManagement />
                )}
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
          height: 6.8rem;
        }
      `}</style>
    </div>
  )
}
