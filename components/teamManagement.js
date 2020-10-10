import { useState } from 'react'
import TeamMember from './cards/teamMember'
import Overlay from './features/overlay'
import DeleteObj from './popup/deleteObj'
import InviteMember from './popup/inviteMember'

export default function TeamManagement() {
  const [isDeleteOverlay, setIsDeleteOverlay] = useState(false)
  const [isInvitedOverlay, setIsInvitedOverlay] = useState(false)

  const onDeletingItem = () => {
    console.log('deleted')
  }

  return (
    <div>
      <Overlay opacity={isDeleteOverlay} />
      <Overlay opacity={isInvitedOverlay} />

      {isDeleteOverlay && (
        <DeleteObj
          name="test"
          onDeletingItem={onDeletingItem}
          setIsDeleteOverlay={setIsDeleteOverlay}
        />
      )}
      {isInvitedOverlay && <InviteMember setIsInvitedOverlay={setIsInvitedOverlay} />}

      <div className="border-b border-gray-400">
        <div className="flex justify-between px-10">
          <p className="text-primaryLight font-semibold mb-1 text-md">Add Team Members</p>
          <button
            className="py-2 px-5 mb-2 bg-primary text-gray-400 text-xs font-semibold rounded-full hover:text-white focus:outline-none"
            onClick={() => {
              setIsInvitedOverlay(true), setIsDeleteOverlay(false)
            }}>
            Add Team Members
          </button>
        </div>
      </div>
      <div>
        <p className="bg-bgLightest text-primaryText font-semibold text-sm py-1 px-10">
          Owners: Have full access to all applications in the account.
        </p>
        <div>
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
        </div>
      </div>
      <div>
        <p className="bg-bgLightest text-primaryText font-semibold text-sm py-1 px-10">
          Admins: Have full access to applications specified by an owner.
        </p>
        <div>
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
        </div>
      </div>
      <div>
        <p className="bg-bgLightest text-primaryText font-semibold text-sm py-1 px-10">
          Members: Have read-only access to applications specified by an admin or an owner.
        </p>
        <div>
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
          <TeamMember setIsDeleteOverlay={setIsDeleteOverlay} />
        </div>
      </div>
    </div>
  )
}
