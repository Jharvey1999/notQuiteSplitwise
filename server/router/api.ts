import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// INTERFACES (matching your local storage structure)
interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  dob?: string;
  portraitUri?: string;
  passwordHash: string;
  createdAt: Date;
}

interface Friend {
  id: string;
  userId: string;
  name: string;
  status: 'accepted';
  createdAt: Date;
}

interface Event {
  id: string;
  name: string;
  date: string;
  totalCost: number;
  createdBy: string;
  participants: Array<{
    userId: string;
    name: string;
    contribution: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// In memory database - users
const users: User[] = [
  {
    id: '1',
    firstName: 'Anon',
    lastName: 'User',
    username: 'anonuser',
    email: 'anon@email.com',
    phone: '000-000-0000',
    dob: '1990-01-01',
    passwordHash: 'password123',
    createdAt: new Date(),
  },
  {
    id: '2',
    firstName: 'J. Robert',
    lastName: 'Oppenheimer',
    username: 'oppenheimer',
    email: 'oppenheimer@email.com',
    phone: '111-111-1111',
    dob: '1904-04-22',
    passwordHash: 'password123',
    createdAt: new Date(),
  },
  {
    id: '3',
    firstName: 'Albert',
    lastName: 'Einstein',
    username: 'einstein',
    email: 'einstein@email.com',
    phone: '222-222-2222',
    dob: '1879-03-14',
    passwordHash: 'password123',
    createdAt: new Date(),
  },
  {
    id: '4',
    firstName: 'Isaac',
    lastName: 'Newton',
    username: 'newton',
    email: 'newton@email.com',
    phone: '333-333-3333',
    dob: '1643-01-04',
    passwordHash: 'password123',
    createdAt: new Date(),
  },
  {
    id: '5',
    firstName: 'Marie',
    lastName: 'Curie',
    username: 'curie',
    email: 'curie@email.com',
    phone: '444-444-4444',
    dob: '1867-11-07',
    passwordHash: 'password123',
    createdAt: new Date(),
  },
  {
    id: '6',
    firstName: 'Nikola',
    lastName: 'Tesla',
    username: 'tesla',
    email: 'tesla@email.com',
    phone: '555-555-5555',
    dob: '1856-07-10',
    passwordHash: 'password123',
    createdAt: new Date(),
  },
];

// In memory database - friends
const friends: Friend[] = [
  {
    id: uuidv4(),
    userId: '1', // Anon's friends
    name: 'Einstein',
    status: 'accepted',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: '1',
    name: 'Newton',
    status: 'accepted',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    userId: '1',
    name: 'Oppenheimer',
    status: 'accepted',
    createdAt: new Date(),
  },
];

// In memory database - events
const events: Event[] = [
  {
    id: '1',
    name: 'Birthday Party',
    date: '2025-08-01',
    totalCost: 120,
    createdBy: '1', // Anon
    participants: [
      { userId: '1', name: 'Anon User', contribution: 50 },
      { userId: '3', name: 'Albert Einstein', contribution: 40 },
      { userId: '4', name: 'Isaac Newton', contribution: 30 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Movie Night',
    date: '2025-08-15',
    totalCost: 60,
    createdBy: '1',
    participants: [
      { userId: '2', name: 'J. Robert Oppenheimer', contribution: 20 },
      { userId: '3', name: 'Albert Einstein', contribution: 30 },
      { userId: '4', name: 'Isaac Newton', contribution: 10 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Game Night',
    date: '2025-09-01',
    totalCost: 60,
    createdBy: '1',
    participants: [
      { userId: '1', name: 'Anon User', contribution: 15 },
      { userId: '2', name: 'J. Robert Oppenheimer', contribution: 25 },
      { userId: '4', name: 'Isaac Newton', contribution: 20 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Dinner Party',
    date: '2025-09-15',
    totalCost: 120,
    createdBy: '1',
    participants: [
      { userId: '1', name: 'Anon User', contribution: 30 },
      { userId: '2', name: 'J. Robert Oppenheimer', contribution: 40 },
      { userId: '3', name: 'Albert Einstein', contribution: 50 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Picnic',
    date: '2025-10-01',
    totalCost: 105,
    createdBy: '1',
    participants: [
      { userId: '1', name: 'Anon User', contribution: 25 },
      { userId: '2', name: 'J. Robert Oppenheimer', contribution: 35 },
      { userId: '3', name: 'Albert Einstein', contribution: 45 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Authentication middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Helper function to find user
const findUser = (emailOrUsername: string) => {
  return users.find(u => u.email === emailOrUsername || u.username === emailOrUsername);
};

// PUBLIC ROUTES
router.post('/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, phone, dob } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    if (findUser(email) || findUser(username)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: uuidv4(),
      firstName,
      lastName,
      username,
      email,
      phone,
      dob,
      passwordHash,
      createdAt: new Date(),
    };

    users.push(newUser);

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { passwordHash: _, ...userResponse } = newUser;
    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: 'Email/username and password required' });
    }

    const user = findUser(emailOrUsername);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // TEMP: allow dummy passwords
    const validPassword = password === user.passwordHash;
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { passwordHash: _, ...userResponse } = user;
    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// PROTECTED ROUTES
router.use(authenticateToken);

// User routes
router.get('/users/profile', (req: any, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  const { passwordHash: _, ...userResponse } = user;
  res.json(userResponse);
});

router.put('/users/profile', (req: any, res) => {
  const userIndex = users.findIndex(u => u.id === req.user.userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { firstName, lastName, phone, dob, portraitUri } = req.body;

  users[userIndex] = {
    ...users[userIndex],
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(phone !== undefined && { phone }),
    ...(dob && { dob }),
    ...(portraitUri !== undefined && { portraitUri }),
  };

  const { passwordHash: _, ...userResponse } = users[userIndex];
  res.json(userResponse);
});

// Friends routes
router.get('/friends', (req: any, res) => {
  const userFriends = friends.filter(f => f.userId === req.user.userId && f.status === 'accepted');
  res.json(userFriends);
});

router.post('/friends/request', (req: any, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  const newFriend: Friend = {
    id: uuidv4(),
    userId: req.user.userId,
    name: name.trim(),
    status: 'accepted',
    createdAt: new Date(),
  };

  friends.push(newFriend);
  res.status(201).json(newFriend);
});

router.delete('/friends/:friendId', (req: any, res) => {
  const { friendId } = req.params;
  const friendIndex = friends.findIndex(f => 
    f.id === friendId && f.userId === req.user.userId
  );

  if (friendIndex === -1) {
    return res.status(404).json({ error: 'Friend not found' });
  }

  friends.splice(friendIndex, 1);
  res.status(204).send();
});

// Events routes (all your existing event endpoints)
router.get('/events', (req: any, res) => {
  try {
    const userEvents = events.filter(event => {
      const isCreator = event.createdBy === req.user.userId;
      const isParticipant = event.participants.some(p => p.userId === req.user.userId);
      return isCreator || isParticipant;
    });
    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
});

router.get('/events/:eventId', (req: any, res) => {
  try {
    const { eventId } = req.params;
    const event = events.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const isCreator = event.createdBy === req.user.userId;
    const isParticipant = event.participants.some(p => p.userId === req.user.userId);

    if (!isCreator && !isParticipant) {
      return res.status(403).json({ error: 'Access denied to this event' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event' });
  }
});

router.post('/events', (req: any, res) => {
  try {
    const { name, date, totalCost, participants } = req.body;

    if (!name || !date || totalCost === undefined) {
      return res.status(400).json({ error: 'Name, date, and total cost are required' });
    }

    if (!Array.isArray(participants)) {
      return res.status(400).json({ error: 'Participants must be an array' });
    }

    for (const participant of participants) {
      if (!participant.userId || !participant.name || participant.contribution === undefined) {
        return res.status(400).json({ 
          error: 'Each participant must have userId, name, and contribution' 
        });
      }
    }

    const newEvent: Event = {
      id: uuidv4(),
      name: name.trim(),
      date,
      totalCost: parseFloat(totalCost),
      createdBy: req.user.userId,
      participants,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.put('/events/:eventId', (req: any, res) => {
  try {
    const { eventId } = req.params;
    const { name, date, totalCost, participants } = req.body;

    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (events[eventIndex].createdBy !== req.user.userId) {
      return res.status(403).json({ error: 'Only event creator can update the event' });
    }

    events[eventIndex] = {
      ...events[eventIndex],
      ...(name && { name: name.trim() }),
      ...(date && { date }),
      ...(totalCost !== undefined && { totalCost: parseFloat(totalCost) }),
      ...(participants && { participants }),
      updatedAt: new Date(),
    };

    res.json(events[eventIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/events/:eventId', (req: any, res) => {
  try {
    const { eventId } = req.params;
    const eventIndex = events.findIndex(e => e.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (events[eventIndex].createdBy !== req.user.userId) {
      return res.status(403).json({ error: 'Only event creator can delete the event' });
    }

    events.splice(eventIndex, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

router.get('/events/shared/:friendId', (req: any, res) => {
  try {
    const { friendId } = req.params;
    
    const friendship = friends.find(f => 
      f.userId === req.user.userId && f.id === friendId && f.status === 'accepted'
    );

    if (!friendship) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    const sharedEvents = events.filter(event => {
      const userIsCreator = event.createdBy === req.user.userId;
      const userIsParticipant = event.participants.some(p => p.userId === req.user.userId);
      const friendIsCreator = event.createdBy === friendId;
      const friendIsParticipant = event.participants.some(p => p.userId === friendId);
      
      return (userIsCreator || userIsParticipant) && (friendIsCreator || friendIsParticipant);
    });

    res.json(sharedEvents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shared events' });
  }
});

router.get('/events/summary', (req: any, res) => {
  try {
    const userEvents = events.filter(event => {
      const isCreator = event.createdBy === req.user.userId;
      const isParticipant = event.participants.some(p => p.userId === req.user.userId);
      return isCreator || isParticipant;
    });

    let totalOwed = 0;
    let totalOwing = 0;
    const balanceDetails: any[] = [];

    userEvents.forEach(event => {
      const userParticipant = event.participants.find(p => p.userId === req.user.userId);
      if (userParticipant) {
        const participantCount = event.participants.length;
        const equalShare = event.totalCost / participantCount;
        const userContribution = userParticipant.contribution;
        const balance = userContribution - equalShare;

        if (balance > 0) {
          totalOwed += balance;
        } else {
          totalOwing += Math.abs(balance);
        }

        balanceDetails.push({
          eventId: event.id,
          eventName: event.name,
          totalCost: event.totalCost,
          userContribution,
          equalShare,
          balance,
        });
      }
    });

    res.json({
      summary: {
        totalOwed,
        totalOwing,
        netBalance: totalOwed - totalOwing,
        eventCount: userEvents.length,
      },
      details: balanceDetails,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate summary' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dataStats: {
      users: users.length,
      friends: friends.length,
      events: events.length
    }
  });
});

export default router;