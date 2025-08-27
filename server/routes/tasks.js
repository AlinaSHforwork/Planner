const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// We'll export a function that accepts the Prisma client
module.exports = (prisma) => {

    // GET /api/tasks
    router.get('/', auth, async (req, res) => {
        try {
            const tasks = await prisma.task.findMany({
                where: { userId: req.user.id },
                orderBy: { dueDate: 'asc' },
            });
            res.json(tasks);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // POST /api/tasks
    router.post('/', auth, async (req, res) => {
        const { title, description, dueDate, tags } = req.body;
        try {
            const newTask = await prisma.task.create({
                data: {
                    title,
                    description,
                    dueDate: dueDate ? new Date(dueDate) : null,
                    tags,
                    user: { connect: { id: req.user.id } },
                },
            });
            res.json(newTask);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // PUT /api/tasks/:id
    router.put('/:id', auth, async (req, res) => {
        const { title, description, dueDate, tags, isCompleted } = req.body;
        const taskFields = { title, description, dueDate, tags, isCompleted };
        try {
            const task = await prisma.task.findUnique({ where: { id: req.params.id } });
            if (!task) {
                return res.status(404).json({ msg: 'Task not found' });
            }
            if (task.userId !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            const updatedTask = await prisma.task.update({
                where: { id: req.params.id },
                data: taskFields,
            });
            res.json(updatedTask);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    // DELETE /api/tasks/:id
    router.delete('/:id', auth, async (req, res) => {
        try {
            const task = await prisma.task.findUnique({ where: { id: req.params.id } });
            if (!task) {
                return res.status(404).json({ msg: 'Task not found' });
            }
            if (task.userId !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            await prisma.task.delete({ where: { id: req.params.id } });
            res.json({ msg: 'Task removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    return router;
};