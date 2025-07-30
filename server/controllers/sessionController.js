import Session from '../model/Sessions.js';

// Api endpoint for getting all the published sessions by all users
export const getPublicSessions = async (_, res) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions' });
  }
};

// Api endpoint for getting my-sessions for a particular user
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user_id: req.userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user sessions' });
  }
};

// API endpoint to get session by ID for editing the session
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user_id: req.userId });
    if (!session) return res.status(404).json({ message: 'Not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session' });
  }
};

// API endpoint to save the drafted session
export const saveDraft = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;
  try {
    let session;
    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.userId },
        { title, tags, json_file_url, status: 'draft', updated_at: new Date() },
        { new: true }
      );
    } else {
      session = await new Session({ user_id: req.userId, title, tags, json_file_url }).save();
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error saving draft' });
  }
};

// API endpoint to publish a drafted session
export const publishSession = async (req, res) => {
  const { _id, title, tags, json_file_url } = req.body;

  try {
    let session;

    if (_id) {
      session = await Session.findOneAndUpdate(
        { _id, user_id: req.userId },
        {
          title,
          tags,
          json_file_url,
          status: 'published',
          updated_at: new Date()
        },
        { new: true }
      );
    } else {
      session = new Session({
        user_id: req.userId,
        title,
        tags,
        json_file_url,
        status: 'published',
        created_at: new Date(),
        updated_at: new Date()
      });

      session = await session.save(); // ✅ ensures _id is generated
    }

    res.status(200).json(session);
  } catch (err) {
    console.error('Publish error:', err);
    res.status(500).json({ message: 'Error publishing session' });
  }
};

