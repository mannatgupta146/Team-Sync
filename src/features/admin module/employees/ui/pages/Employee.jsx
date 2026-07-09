import React, { useState } from 'react'
import useEmployees from '../../hooks/useEmployees'
import { User, Mail, Briefcase, Calendar, Shield, Users, Activity, UserPlus, Search, Plus, X, Edit2, Trash2, MoreVertical } from 'lucide-react'

const Employee = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 20
  const { data, isPending, error, createEmployee, isCreating, updateEmployee, deleteEmployee } = useEmployees()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'common',
    role: 'employee',
    status: 'active'
  })

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    department: 'common',
    role: 'employee',
    status: 'active'
  })

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-(--text-primary)">
        <div className="w-8 h-8 border-4 border-(--active-nav-text) border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 mt-4 text-base text-(--text-secondary)">Loading employee directory...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400">
        <h3 className="text-lg font-bold mb-2">Error loading employees</h3>
        <p className="text-sm">{error.message}</p>
      </div>
    )
  }

  if (!data || !data.employees) {
    return (
      <div className="p-12 text-center rounded-2xl border border-(--border-color) bg-(--bg-surface) text-(--text-muted)">
        <User size={40} className="mx-auto mb-4 text-(--text-muted)/40" />
        <h3 className="text-lg font-bold mb-1">No employees found</h3>
        <p className="text-sm">There are no registered employees in the system yet.</p>
      </div>
    )
  }

  console.log("EMPLOYEES DATA:", data)

  // Calculate dynamic stats
  const employeesArray = data.employees || (Array.isArray(data) ? data : [])
  const dbTotalEmployees = employeesArray.length

  const uniqueDeps = new Set(employeesArray.map(e => e.department?.toLowerCase()?.trim() || 'common'))
  const totalDepartments = uniqueDeps.size
  const uniqueDepsArray = Array.from(uniqueDeps)
  const activeCount = employeesArray.filter(e => e.status === 'active').length

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newHiresCount = employeesArray.filter(e => e.createdAt && new Date(e.createdAt) >= thirtyDaysAgo).length

  // Filter employees based on search query
  const filteredEmployees = employeesArray.filter(e => {
    const query = searchQuery.toLowerCase()
    return (
      e.name?.toLowerCase().includes(query) ||
      e.email?.toLowerCase().includes(query) ||
      e.department?.toLowerCase().includes(query) ||
      e.role?.toLowerCase().includes(query)
    )
  })

  // Calculate dynamic pagination totals based on active listing (filtered list)
  const totalEmployees = filteredEmployees.length
  const totalPages = Math.ceil(totalEmployees / limit) || 1

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    const date = safeParseDate(dateStr)
    if (!date) return 'N/A'
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format time helper (uses 12-hour format with AM/PM for user locale)
  const formatTime = (dateStr) => {
    const date = safeParseDate(dateStr)
    if (!date) return ''
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  // Safe date parser to normalize cross-browser and timezone offsets
  const safeParseDate = (dateStr) => {
    if (!dateStr) return null
    let normalized = dateStr.toString().trim()
    if (normalized.includes(' ') && !normalized.includes('T')) {
      normalized = normalized.replace(' ', 'T')
    }
    if (!normalized.includes('Z') && !normalized.includes('+') && !normalized.includes('-')) {
      normalized = normalized + 'Z'
    }
    const date = new Date(normalized)
    return isNaN(date.getTime()) ? null : date
  }

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Helper to get initials avatar style (cohesive slate/neutral design)
  const getAvatarStyle = () => {
    return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50'
  }

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({ ...prev, [name]: value }))
  }

  // Form submissions
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await createEmployee(formData)
      setIsModalOpen(false)
      // reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        department: uniqueDepsArray[0] || 'common',
        role: 'employee',
        status: 'active'
      })
    } catch (err) {
      // Handled by toast
    }
  }

  const handleEditFormSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateEmployee({
        id: editingEmployee._id || editingEmployee.id,
        updateData: editFormData
      })
      setIsEditModalOpen(false)
    } catch (err) {
      // Handled by toast
    }
  }

  // Toggle status trigger
  const handleToggleStatus = async (elem) => {
    const newStatus = elem.status === 'active' ? 'inactive' : 'active'
    try {
      await updateEmployee({
        id: elem._id || elem.id,
        updateData: { status: newStatus }
      })
    } catch (err) {
      // Handled by toast
    }
  }

  // Edit modal opener
  const handleOpenEditModal = (elem) => {
    setEditingEmployee(elem)
    setEditFormData({
      name: elem.name || '',
      email: elem.email || '',
      department: elem.department || 'common',
      role: elem.role || 'employee',
      status: elem.status || 'active'
    })
    setIsEditModalOpen(true)
  }

  // Delete trigger
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      try {
        await deleteEmployee(id)
      } catch (err) {
        // Handled by toast
      }
    }
  }

  // Sort employees: newest first (based on createdAt)
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const dateA = safeParseDate(a.createdAt)
    const dateB = safeParseDate(b.createdAt)
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return dateB.getTime() - dateA.getTime()
  })

  // Paginated slice of sorted employees
  const activePage = Math.min(currentPage, totalPages)
  const pageStart = (activePage - 1) * limit
  const pageEnd = activePage * limit
  const paginatedEmployees = sortedEmployees.slice(pageStart, pageEnd)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight">Employee Directory</h1>
        <p className="text-(--text-secondary) text-xs mt-1">
          Monitor your organization's members, access levels, functional teams, and active session states.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees */}
        <div className="relative overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-surface) p-4 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-(--text-muted) uppercase tracking-wider">Total Employees</p>
            <p className="text-2xl font-bold text-(--text-primary)">{dbTotalEmployees}</p>
            <p className="text-[10px] text-(--text-muted)">Active registry members</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-300 border border-purple-500/20">
            <Users size={18} />
          </div>
        </div>

        {/* Departments */}
        <div className="relative overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-surface) p-4 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-(--text-muted) uppercase tracking-wider">Departments</p>
            <p className="text-2xl font-bold text-(--text-primary)">{totalDepartments}</p>
            <p className="text-[10px] text-(--text-muted)">Functional organizational units</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-300 border border-blue-500/20">
            <Briefcase size={18} />
          </div>
        </div>

        {/* Active Now */}
        <div className="relative overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-surface) p-4 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-(--text-muted) uppercase tracking-wider">Active Now</p>
            <p className="text-2xl font-bold text-(--text-primary)">{activeCount}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Live session states
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Activity size={18} />
          </div>
        </div>

        {/* New Hires */}
        <div className="relative overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-surface) p-4 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold text-(--text-muted) uppercase tracking-wider">New Hires</p>
            <p className="text-2xl font-bold text-(--text-primary)">{newHiresCount}</p>
            <p className="text-[10px] text-(--text-muted)">Joined in last 30 days</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-300 border border-amber-500/20">
            <UserPlus size={18} />
          </div>
        </div>
      </div>

      {/* Actions and Search Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <input
            type="text"
            placeholder="Search by name, email, department, or role..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-(--border-color) bg-(--bg-surface) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-xs"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-10 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Row-Based Employees Directory Table */}
      {sortedEmployees.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--text-muted)">
          <Search size={32} className="mx-auto mb-3 text-(--text-muted)/30" />
          <h3 className="text-base font-bold mb-1">No matching results</h3>
          <p className="text-xs">We couldn't find any employees matching your search query.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-(--border-color) bg-(--bg-surface) overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-(--border-color) bg-(--bg-hover)/20 text-(--text-muted) text-xs font-bold uppercase tracking-wider">
                  <th className="px-5 py-3">Profile</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Department</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Time of Join</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-color) text-xs text-(--text-secondary)">
                {paginatedEmployees.map((elem, idx) => {
                const initials = getInitials(elem.name)
                const joinDate = formatDate(elem.createdAt)
                const joinTime = formatTime(elem.createdAt)
                const isAdmin = elem.role === 'admin'
                const isActive = elem.status === 'active'
                const avatarStyle = getAvatarStyle()

                return (
                  <tr key={elem._id || elem.id || idx} className="hover:bg-(--bg-hover)/20 transition-colors group">
                    {/* Profile details */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        {elem.avatar ? (
                          <img
                            src={elem.avatar}
                            alt={elem.name}
                            className="w-10 h-10 rounded-full object-cover border border-(--border-color)"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full ${avatarStyle} flex items-center justify-center font-bold text-xs shadow-xs`}>
                            {initials}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-sm text-(--text-primary) group-hover:text-(--active-nav-text) transition-colors">{elem.name}</div>
                          <div className="text-[11px] text-(--text-muted) mt-0.5">{elem.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${isAdmin
                          ? 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-300'
                          : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-300'
                        }`}>
                        {isAdmin ? <Shield size={10} /> : <User size={10} />}
                        {elem.role || 'employee'}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-3">
                      <span className="capitalize px-2 py-0.5 rounded-md bg-(--bg-hover) text-(--text-primary) border border-(--border-color) text-[11px] font-medium">
                        {elem.department || 'Common'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${isActive
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="capitalize">{elem.status || 'Active'}</span>
                      </span>
                    </td>

                    {/* Join date/time */}
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-(--text-primary) font-semibold">{joinDate}</span>
                        <span className="text-[10px] text-(--text-muted) mt-0.5">{joinTime}</span>
                      </div>
                    </td>

                    {/* Actions cell (3 dots dropdown) */}
                    <td className="px-5 py-3 text-right">
                      <div className="inline-block relative text-left">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(openDropdownId === elem._id ? null : elem._id);
                          }}
                          type="button"
                          className="p-1.5 text-(--text-muted) hover:text-(--text-primary) rounded-lg hover:bg-(--bg-hover) transition-colors cursor-pointer"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openDropdownId === elem._id && (
                          <>
                            {/* Backdrop overlay to close on click outside */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenDropdownId(null)}
                            />

                            <div className="absolute right-0 mt-1 w-44 rounded-xl border border-(--border-color) bg-(--bg-surface) shadow-xl z-20 py-1 text-left">
                              {/* Edit details */}
                              <button
                                onClick={() => {
                                  setOpenDropdownId(null);
                                  handleOpenEditModal(elem);
                                }}
                                type="button"
                                className="w-full px-3 py-1.5 text-xs text-(--text-primary) hover:bg-(--bg-hover) transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <Edit2 size={12} className="text-blue-500" />
                                <span>Edit Details</span>
                              </button>

                              {/* Toggle Active/Inactive */}
                              <button
                                onClick={() => {
                                  setOpenDropdownId(null);
                                  handleToggleStatus(elem);
                                }}
                                type="button"
                                className="w-full px-3 py-1.5 text-xs text-(--text-primary) hover:bg-(--bg-hover) transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <Activity size={12} className={isActive ? "text-amber-500" : "text-emerald-500"} />
                                <span>{isActive ? 'Mark as Inactive' : 'Mark as Active'}</span>
                              </button>

                              <hr className="border-(--border-color) my-1" />

                              {/* Delete Employee */}
                              <button
                                onClick={() => {
                                  setOpenDropdownId(null);
                                  handleDelete(elem._id || elem.id);
                                }}
                                type="button"
                                className="w-full px-3 py-1.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <Trash2 size={12} />
                                <span>Delete Employee</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-(--border-color) bg-(--bg-surface) text-xs text-(--text-secondary)">
          <div>
            Showing <span className="font-semibold text-(--text-primary)">{totalEmployees === 0 ? 0 : (activePage - 1) * limit + 1}</span> to <span className="font-semibold text-(--text-primary)">{Math.min(activePage * limit, totalEmployees)}</span> of <span className="font-semibold text-(--text-primary)">{totalEmployees}</span> employees
          </div>
          <div className="flex items-center gap-1.5">
            {activePage > 1 && (
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-2.5 py-1.5 rounded-lg border border-(--border-color) bg-transparent hover:bg-(--bg-hover) text-(--text-primary) font-semibold transition cursor-pointer"
              >
                Previous
              </button>
            )}

            {pageNumbers.map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg border text-center flex items-center justify-center font-bold transition cursor-pointer text-xs ${
                  activePage === pageNum
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'border-(--border-color) bg-transparent hover:bg-(--bg-hover) text-(--text-primary)'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {activePage < totalPages && (
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-2.5 py-1.5 rounded-lg border border-(--border-color) bg-transparent hover:bg-(--bg-hover) text-(--text-primary) font-semibold transition cursor-pointer"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    )}

      {/* Add Employee Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-full max-w-lg bg-(--bg-surface) border border-(--border-color) rounded-2xl p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-(--text-muted) hover:text-(--text-primary) rounded-lg hover:bg-(--bg-hover) transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-(--text-primary)">Add New Employee</h2>
              <p className="text-xs text-(--text-muted) mt-1">
                Enter details to register a new employee in the company database.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-xs"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-xs"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-xs"
                />
              </div>

              {/* Row: Department & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-xs capitalize"
                  >
                    {uniqueDepsArray.map(dep => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-xs"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-xs"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-12 rounded-xl border border-(--border-color) bg-transparent text-(--text-primary) font-bold text-xs hover:bg-(--bg-hover) transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add Employee</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Employee Form Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-full max-w-lg bg-(--bg-surface) border border-(--border-color) rounded-2xl p-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-(--text-muted) hover:text-(--text-primary) rounded-lg hover:bg-(--bg-hover) transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-(--text-primary)">Edit Employee Details</h2>
              <p className="text-xs text-(--text-muted) mt-1">
                Modify employee registry properties and access rights.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleEditFormSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-xs"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-xs"
                />
              </div>

              {/* Row: Department & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                    Department
                  </label>
                  <select
                    name="department"
                    value={editFormData.department}
                    onChange={handleEditInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-xs capitalize"
                  >
                    {uniqueDepsArray.map(dep => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                    Role
                  </label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-xs"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-xs font-semibold text-(--text-secondary)">
                  Status
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-xs"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 h-12 rounded-xl border border-(--border-color) bg-transparent text-(--text-primary) font-bold text-xs hover:bg-(--bg-hover) transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Update Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employee