/**
 * USER MANAGEMENT API ROUTES
 * Rutas para gestionar usuarios del sistema
 */

import { Router, Request, Response } from 'express'
import { userManagementService } from '../services/user-management-service'

const router = Router()

/**
 * GET /api/users
 * Obtener todos los usuarios
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const users = userManagementService.getAllUsers()

    res.json({
      success: true,
      count: users.length,
      users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching users'
    })
  }
})

/**
 * GET /api/users/:username
 * Obtener usuario por nombre de usuario
 */
router.get('/:username', (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const user = userManagementService.getUserByUsername(username)

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      })
    }

    res.json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching user'
    })
  }
})

/**
 * POST /api/users
 * Crear nuevo usuario
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const { username, email, role } = req.body

    if (!username || !email || !role) {
      return res.status(400).json({
        success: false,
        error: 'Username, email y role son requeridos'
      })
    }

    const user = userManagementService.createUser({
      username,
      email,
      role
    })

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error creating user'
    })
  }
})

/**
 * PUT /api/users/:username
 * Actualizar usuario
 */
router.put('/:username', (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const { email, role, status } = req.body

    const user = userManagementService.updateUser(username, {
      email,
      role,
      status
    })

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error updating user'
    })
  }
})

/**
 * DELETE /api/users/:username
 * Eliminar usuario
 */
router.delete('/:username', (req: Request, res: Response) => {
  try {
    const { username } = req.params

    const deleted = userManagementService.deleteUser(username)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      })
    }

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error deleting user'
    })
  }
})

/**
 * GET /api/users/role/:role
 * Obtener usuarios por rol
 */
router.get('/role/:role', (req: Request, res: Response) => {
  try {
    const { role } = req.params
    const users = userManagementService.getUsersByRole(role)

    res.json({
      success: true,
      count: users.length,
      users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching users by role'
    })
  }
})

/**
 * POST /api/users/:username/status
 * Cambiar estado de usuario
 */
router.post('/:username/status', (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const { status } = req.body

    if (!status || !['activo', 'inactivo', 'bloqueado'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Estado inválido'
      })
    }

    const user = userManagementService.changeUserStatus(username, status)

    res.json({
      success: true,
      message: 'Estado de usuario actualizado',
      user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error changing user status'
    })
  }
})

/**
 * POST /api/users/:username/login
 * Registrar login de usuario
 */
router.post('/:username/login', (req: Request, res: Response) => {
  try {
    const { username } = req.params

    userManagementService.recordLogin(username)

    res.json({
      success: true,
      message: 'Login registrado'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error recording login'
    })
  }
})

/**
 * GET /api/users/:username/permissions
 * Obtener permisos de usuario
 */
router.get('/:username/permissions', (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const permissions = userManagementService.getUserPermissions(username)

    res.json({
      success: true,
      username,
      permissions
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching permissions'
    })
  }
})

/**
 * GET /api/users/stats/all
 * Obtener estadísticas de usuarios
 */
router.get('/stats/all', (req: Request, res: Response) => {
  try {
    const stats = userManagementService.getStatistics()

    res.json({
      success: true,
      statistics: stats
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error fetching statistics'
    })
  }
})

/**
 * GET /api/users/export/json
 * Exportar usuarios a JSON
 */
router.get('/export/json', (req: Request, res: Response) => {
  try {
    const json = userManagementService.exportToJSON()

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', 'attachment; filename=users.json')
    res.send(json)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error exporting users'
    })
  }
})

export { router as userManagementRouter }
