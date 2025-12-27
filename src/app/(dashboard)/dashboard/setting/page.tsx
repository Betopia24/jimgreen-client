
import UserSettingsPage from '@/components/dashboard/userSetting/userSetting'
import PageHeader from '@/components/dashboard/PageHeader'
import React from 'react'

function Setting() {
  return (
    <div>
      <PageHeader title='Settings' description='Manage your account and preferences' />
      <UserSettingsPage />
    </div>
  )
}

export default Setting