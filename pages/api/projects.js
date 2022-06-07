import { connectDB, Project } from '../../utils/db-utils';
import { validToken } from '../../utils/helpers';

const handler = async (req, res) => {
    try {
        await connectDB();
    } catch (error) {
        return res.status(500).end();
    }

    if (req.method === 'GET') {
        const currentProjects = await Project.find({
            dateCompleted: null,
        }).sort({
            date: -1,
        });
        const completedProjects = await Project.find({
            dateCompleted: { $ne: null },
        }).sort({ date: -1 });

        return res.status(200).json({ currentProjects, completedProjects });
    }

    const authHeader = req.headers?.['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token || !validToken(token)) return res.status(403).end();

    const project = req.body;

    if (req.method === 'DELETE') {
        try {
            await Project.deleteOne({ _id: project.id });

            return res.status(204).end();
        } catch (error) {
            return res.status(500).end();
        }
    }

    project.date = new Date(project?.date);
    project.dateCompleted = project.dateCompleted
        ? new Date(project.dateCompleted)
        : null;

    if (req.method === 'POST') {
        try {
            await new Project(project).save();

            return res.status(201).json({
                status: 'success',
                message: 'Project successfully created.',
            });
        } catch (error) {
            return res.status(500).end();
        }
    }

    if (req.method === 'PATCH') {
        try {
            await Project.findByIdAndUpdate(project.projectId, project, {
                runValidators: true,
            });

            return res.status(204).end();
        } catch (error) {
            return res.status(500).end();
        }
    }
};

export default handler;
