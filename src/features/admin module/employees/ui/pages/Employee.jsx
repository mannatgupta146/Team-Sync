import React, { useState } from 'react'
import useEmployees from '../../hooks/useEmployees'
import { User, Mail, Briefcase, Calendar, Shield, Users, Activity, UserPlus, Search, Plus, X } from 'lucide-react'

const Employee = () => {
  const { data, isPending, error, createEmployee, isCreating } = useEmployees()
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    department: 'common',
    role: 'employee',
    status: 'active'
  })

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-(--text-primary)">
        <div className="w-8 h-8 border-4 border-(--active-nav-text) border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 mt-4 text-lg text-(--text-secondary)">Loading employee directory...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400">
        <h3 className="text-xl font-bold mb-2">Error loading employees</h3>
        <p>{error.message}</p>
      </div>
    )
  }

  if (!data || !data.employees) {
    return (
      <div className="p-12 text-center rounded-2xl border border-(--border-color) bg-(--bg-surface) text-(--text-muted)">
        <User size={48} className="mx-auto mb-4 text-(--text-muted)/40" />
        <h3 className="text-xl font-bold mb-1">No employees found</h3>
        <p className="text-sm">There are no registered employees in the system yet.</p>
      </div>
    )
  }

  // Calculate dynamic stats
  const totalEmployees = data.employees.length
  const uniqueDeps = new Set(data.employees.map(e => e.department?.toLowerCase()?.trim() || 'common'))
  const totalDepartments = uniqueDeps.size
  const uniqueDepsArray = Array.from(uniqueDeps)
  const activeCount = data.employees.filter(e => e.status === 'active').length

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newHiresCount = data.employees.filter(e => e.createdAt && new Date(e.createdAt) >= thirtyDaysAgo).length

  // Filter employees based on search query
  const filteredEmployees = data.employees.filter(e => {
    const query = searchQuery.toLowerCase()
    return (
      e.name?.toLowerCase().includes(query) ||
      e.email?.toLowerCase().includes(query) ||
      e.department?.toLowerCase().includes(query) ||
      e.role?.toLowerCase().includes(query)
    )
  })

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

  // Format date helper
  const formatDate = (dateStr) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
        department: 'common',
        role: 'employee',
        status: 'active'
      })
    } catch (err) {
      // Handled by toast in useEmployees hook
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

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold text-(--text-primary) tracking-tight">Employee Directory</h1>
        <p className="text-(--text-secondary) text-sm mt-1">
          Monitor your organization's members, access levels, functional teams, and active session states.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Employees */}
        <div className="relative overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-surface) p-6 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Total Employees</p>
            <p className="text-3xl font-bold text-(--text-primary)">{totalEmployees}</p>
            <p className="text-xs text-(--text-muted)">Active registry members</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-300 border border-purple-500/20">
            <Users size={22} />
          </div>
        </div>

        {/* Departments */}
        <div className="relative overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-surface) p-6 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Departments</p>
            <p className="text-3xl font-bold text-(--text-primary)">{totalDepartments}</p>
            <p className="text-xs text-(--text-muted)">Functional organizational units</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-300 border border-blue-500/20">
            <Briefcase size={22} />
          </div>
        </div>

        {/* Active Now */}
        <div className="relative overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-surface) p-6 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Active Now</p>
            <p className="text-3xl font-bold text-(--text-primary)">{activeCount}</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live session states
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Activity size={22} />
          </div>
        </div>

        {/* New Hires */}
        <div className="relative overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-surface) p-6 flex items-center justify-between group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300 pointer-events-none" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">New Hires</p>
            <p className="text-3xl font-bold text-(--text-primary)">{newHiresCount}</p>
            <p className="text-xs text-(--text-muted)">Joined in last 30 days</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-300 border border-amber-500/20">
            <UserPlus size={22} />
          </div>
        </div>
      </div>

      {/* Actions and Search Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <input
            type="text"
            placeholder="Search by name, email, department, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-(--border-color) bg-(--bg-surface) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-sm"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-12 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Row-Based Employees Directory Table */}
      {sortedEmployees.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-(--border-color) bg-(--bg-surface) text-(--text-muted)">
          <Search size={40} className="mx-auto mb-4 text-(--text-muted)/30" />
          <h3 className="text-xl font-bold mb-1">No matching results</h3>
          <p className="text-sm">We couldn't find any employees matching your search query.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-(--border-color) bg-(--bg-surface)">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-(--border-color) bg-(--bg-hover)/20 text-(--text-muted) text-base font-extrabold uppercase tracking-wider">
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time of Join</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color) text-lg text-(--text-secondary)">
              {sortedEmployees.map((elem, idx) => {
                const initials = getInitials(elem.name)
                const joinDate = formatDate(elem.createdAt)
                const joinTime = formatTime(elem.createdAt)
                const isAdmin = elem.role === 'admin'
                const isActive = elem.status === 'active'
                const avatarStyle = getAvatarStyle()

                return (
                  <tr key={elem._id || elem.id || idx} className="hover:bg-(--bg-hover)/30 transition-colors group">
                    {/* Profile details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {elem.avatar ? (
                          <img 
                            src={elem.avatar} 
                            alt={elem.name} 
                            className="w-14 h-14 rounded-full object-cover border border-(--border-color)"
                          />
                        ) : (
                          <div className={`w-14 h-14 rounded-full ${avatarStyle} flex items-center justify-center font-bold text-lg shadow-xs`}>
                            {initials}
                          </div>
                        )}
                        <div>
                          <div className="font-extrabold text-lg text-(--text-primary) group-hover:text-(--active-nav-text) transition-colors">{elem.name}</div>
                          <div className="text-base text-(--text-muted) mt-0.5">{elem.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border ${
                        isAdmin 
                          ? 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-300' 
                          : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-300'
                      }`}>
                        {isAdmin ? <Shield size={12} /> : <User size={12} />}
                        {elem.role || 'employee'}
                      </span>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">
                      <span className="capitalize px-3.5 py-2 rounded-lg bg-(--bg-hover) text-(--text-primary) border border-(--border-color) text-base font-semibold">
                        {elem.department || 'Common'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-base font-bold border ${
                        isActive 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="capitalize">{elem.status || 'Active'}</span>
                      </span>
                    </td>

                    {/* Join date/time */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-lg text-(--text-primary) font-bold">{joinDate}</span>
                        <span className="text-base text-(--text-muted) mt-0.5">{joinTime}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
              <p className="text-sm text-(--text-muted) mt-1">
                Enter details to register a new employee in the company database.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-(--text-secondary)">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-(--text-secondary)">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-(--text-secondary)">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors placeholder:text-(--text-muted) text-sm"
                />
              </div>

              {/* Row: Department & Role */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-(--text-secondary)">
                    Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-sm capitalize"
                  >
                    {uniqueDepsArray.map(dep => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-(--text-secondary)">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-sm"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-(--text-secondary)">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 rounded-xl border border-(--border-color) bg-(--bg-main) text-(--text-primary) outline-none focus:border-(--active-nav-text) transition-colors text-sm"
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
                  className="flex-1 h-12 rounded-xl border border-(--border-color) bg-transparent text-(--text-primary) font-bold text-sm hover:bg-(--bg-hover) transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  )
}

export default Employee