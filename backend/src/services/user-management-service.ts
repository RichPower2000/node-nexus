/**
 * USER MANAGEMENT SERVICE
 * Servicio para gestionar usuarios del sistema
 */

interface User {
  id: string
  username: string
  email: string
  role: 'CEO' | 'Admin' | 'Operator' | 'Auditor'
  status: 'activo' | 'inactivo' | 'bloqueado'
  createdAt: string
  lastLogin?: string
  permissions: string[]
}

interface UserCreateRequest {
  username: string
  email: string
  role: 'CEO' | 'Admin' | 'Operator' | 'Auditor'
}

interface UserUpdateRequest {
  email?: string
  role?: 'CEO' | 'Admin' | 'Operator' | 'Auditor'
  status?: 'activo' | 'inactivo' | 'bloqueado'
}

export class UserManagementService {
  private users: Map<string, User> = new Map()
  private readonly ROLE_PERMISSIONS = {
    CEO: ['manage_users', 'view_dashboard', 'manage_transfers', 'view_history', 'manage_system'],
    Admin: ['view_dashboard', 'manage_transfers', 'view_history', 'manage_reports'],
    Operator: ['view_dashboard', 'manage_transfers', 'view_history'],
    Auditor: ['view_dashboard', 'view_history', 'view_reports']
  }

  constructor() {
    this.initializeDefaultUsers()
    console.log('[USER-MANAGEMENT] 👥 User Management Service initialized')
  }

  /**
   * Inicializar usuarios por defecto
   */
  private initializeDefaultUsers(): void {
    const defaultUsers: User[] = [
      {
        id: 'user-ceo-001',
        username: 'ceo',
        email: 'ceo@nexus.com',
        role: 'CEO',
        status: 'activo',
        createdAt: new Date().toISOString(),
        permissions: this.ROLE_PERMISSIONS.CEO
      },
      {
        id: 'user-admin-001',
        username: 'admin',
        email: 'admin@nexus.com',
        role: 'Admin',
        status: 'activo',
        createdAt: new Date().toISOString(),
        permissions: this.ROLE_PERMISSIONS.Admin
      },
      {
        id: 'user-operator-001',
        username: 'operator',
        email: 'operator@nexus.com',
        role: 'Operator',
        status: 'activo',
        createdAt: new Date().toISOString(),
        permissions: this.ROLE_PERMISSIONS.Operator
      }
    ]

    defaultUsers.forEach(user => {
      this.users.set(user.username, user)
    })

    console.log('[USER-MANAGEMENT] ✅ Default users initialized')
  }

  /**
   * Crear nuevo usuario
   */
  createUser(request: UserCreateRequest): User {
    // Validar que el usuario no exista
    if (this.users.has(request.username)) {
      throw new Error(`Usuario ${request.username} ya existe`)
    }

    // Validar email
    if (!this.isValidEmail(request.email)) {
      throw new Error('Email inválido')
    }

    const userId = `user-${request.role.toLowerCase()}-${Date.now()}`
    const user: User = {
      id: userId,
      username: request.username,
      email: request.email,
      role: request.role,
      status: 'activo',
      createdAt: new Date().toISOString(),
      permissions: this.ROLE_PERMISSIONS[request.role]
    }

    this.users.set(request.username, user)

    console.log(`[USER-MANAGEMENT] ✅ Usuario creado: ${request.username}`)
    console.log(`[USER-MANAGEMENT] Rol: ${request.role}`)
    console.log(`[USER-MANAGEMENT] Email: ${request.email}`)

    return user
  }

  /**
   * Obtener usuario por nombre de usuario
   */
  getUserByUsername(username: string): User | undefined {
    return this.users.get(username)
  }

  /**
   * Obtener usuario por ID
   */
  getUserById(id: string): User | undefined {
    for (const user of this.users.values()) {
      if (user.id === id) {
        return user
      }
    }
    return undefined
  }

  /**
   * Actualizar usuario
   */
  updateUser(username: string, request: UserUpdateRequest): User {
    const user = this.users.get(username)
    if (!user) {
      throw new Error(`Usuario ${username} no encontrado`)
    }

    if (request.email) {
      if (!this.isValidEmail(request.email)) {
        throw new Error('Email inválido')
      }
      user.email = request.email
    }

    if (request.role) {
      user.role = request.role
      user.permissions = this.ROLE_PERMISSIONS[request.role]
    }

    if (request.status) {
      user.status = request.status
    }

    console.log(`[USER-MANAGEMENT] ✅ Usuario actualizado: ${username}`)

    return user
  }

  /**
   * Eliminar usuario
   */
  deleteUser(username: string): boolean {
    // No permitir eliminar usuarios por defecto
    if (['ceo', 'admin', 'operator'].includes(username)) {
      throw new Error('No se pueden eliminar usuarios del sistema')
    }

    const deleted = this.users.delete(username)
    if (deleted) {
      console.log(`[USER-MANAGEMENT] ✅ Usuario eliminado: ${username}`)
    }
    return deleted
  }

  /**
   * Obtener todos los usuarios
   */
  getAllUsers(): User[] {
    return Array.from(this.users.values()).map(user => ({
      ...user,
      // No incluir información sensible
    }))
  }

  /**
   * Obtener usuarios por rol
   */
  getUsersByRole(role: string): User[] {
    return Array.from(this.users.values()).filter(u => u.role === role)
  }

  /**
   * Cambiar estado de usuario
   */
  changeUserStatus(username: string, status: 'activo' | 'inactivo' | 'bloqueado'): User {
    const user = this.users.get(username)
    if (!user) {
      throw new Error(`Usuario ${username} no encontrado`)
    }

    user.status = status
    console.log(`[USER-MANAGEMENT] ✅ Estado de usuario actualizado: ${username} → ${status}`)

    return user
  }

  /**
   * Registrar último login
   */
  recordLogin(username: string): void {
    const user = this.users.get(username)
    if (user) {
      user.lastLogin = new Date().toISOString()
      console.log(`[USER-MANAGEMENT] 📝 Login registrado: ${username}`)
    }
  }

  /**
   * Verificar permisos de usuario
   */
  hasPermission(username: string, permission: string): boolean {
    const user = this.users.get(username)
    if (!user) return false
    return user.permissions.includes(permission)
  }

  /**
   * Obtener permisos de usuario
   */
  getUserPermissions(username: string): string[] {
    const user = this.users.get(username)
    return user ? user.permissions : []
  }

  /**
   * Validar email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Obtener estadísticas de usuarios
   */
  getStatistics() {
    const users = Array.from(this.users.values())
    const byRole: Record<string, number> = {}
    const byStatus: Record<string, number> = {}

    users.forEach(user => {
      byRole[user.role] = (byRole[user.role] || 0) + 1
      byStatus[user.status] = (byStatus[user.status] || 0) + 1
    })

    return {
      totalUsers: users.length,
      byRole,
      byStatus,
      activeUsers: users.filter(u => u.status === 'activo').length,
      inactiveUsers: users.filter(u => u.status === 'inactivo').length,
      blockedUsers: users.filter(u => u.status === 'bloqueado').length
    }
  }

  /**
   * Exportar usuarios a JSON
   */
  exportToJSON(): string {
    const users = this.getAllUsers()
    const stats = this.getStatistics()

    return JSON.stringify({
      exportDate: new Date().toISOString(),
      statistics: stats,
      users: users
    }, null, 2)
  }
}

export const userManagementService = new UserManagementService()
