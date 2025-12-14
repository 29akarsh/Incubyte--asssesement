import { Router } from 'express';
import { SweetController } from '../controllers/sweet.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();
const sweetController = new SweetController();

// All routes require authentication
router.use(authenticateToken);

// Public routes (authenticated users)
router.get('/', sweetController.getAllSweets);
router.get('/search', sweetController.searchSweets);
router.post('/:id/purchase', sweetController.purchaseSweet);

// Admin only routes
router.post('/', requireAdmin, sweetController.createSweet);
router.put('/:id', requireAdmin, sweetController.updateSweet);
router.delete('/:id', requireAdmin, sweetController.deleteSweet);
router.post('/:id/restock', requireAdmin, sweetController.restockSweet);

export default router;

