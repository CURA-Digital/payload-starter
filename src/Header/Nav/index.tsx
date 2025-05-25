'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link, subItems }, i) => {
        const hasSubItems = subItems && subItems.length > 0

        if (hasSubItems) {
          return (
            <div
              key={i}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(i)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="cursor-pointer">
                <CMSLink {...{ ...link, label: undefined }} appearance="link">
                  <span className="flex items-center gap-1">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </CMSLink>
              </div>

              {openDropdown === i && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-white border border-gray-200 rounded-md shadow-lg min-w-48">
                    <div className="py-2">
                      {subItems.map(({ link: subLink, nestedSubItems }, subIndex) => {
                        const hasNestedSubItems = nestedSubItems && nestedSubItems.length > 0

                        if (hasNestedSubItems) {
                          return (
                            <div key={subIndex} className="relative group/nested">
                              <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                                <CMSLink {...subLink} appearance="link" />
                                <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                              </div>

                              <div className="absolute left-full top-0 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200 z-50">
                                <div className="bg-white border border-gray-200 rounded-md shadow-lg min-w-48">
                                  <div className="py-2">
                                    {nestedSubItems.map(({ link: nestedLink }, nestedIndex) => (
                                      <div key={nestedIndex} className="px-4 py-2 hover:bg-gray-50">
                                        <CMSLink {...nestedLink} appearance="link" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        }

                        return (
                          <div key={subIndex} className="px-4 py-2 hover:bg-gray-50">
                            <CMSLink {...subLink} appearance="link" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }

        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
