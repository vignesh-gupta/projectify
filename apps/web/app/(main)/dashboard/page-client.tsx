"use client";

import NoOrg from '@/components/empty-states/no-org'
import ProjectList from '@/components/projects/project-list'
import { useOrganization } from '@clerk/nextjs'
import React from 'react'

const DashboardClientPage = () => {
  const { organization } = useOrganization()

  return (
    <div className="flex-1 h-[calc(100dvh-80px)] p-6">
      {!organization ? <NoOrg /> : <ProjectList orgId={organization.id} />}
    </div>
  )
}

export default DashboardClientPage