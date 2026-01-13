
import { AgentSchema, DayActivity, Quest } from './types';

export const MANIFESTO_TEXT = `
# The Architect's Manifesto: Mastery of Self and System

In an age of digital noise and fragmented attention, we reclaim the role of the Architect. We do not drift; we design. We do not react; we orchestrate.

### 1. The Primacy of Order
Chaos is the natural state of the unmanaged world. Order is the prerequisite for all greatness. We build systems—both biological and digital—to sustain the weight of our ambitions.

### 2. The Integrated Agent
We do not view AI as a tool, but as a digital extension of our will. Every agent we deploy must have a clear directive, a defined failure protocol, and a feedback loop that honors human intuition.

### 3. The Sovereign Household
A man's greatest empire is his family. Every professional gain must serve the household's stability, joy, and legacy. We leverage technology to buy back time, not to sell our souls.

### 4. Interesting Decisions
Following Sid Meier, we seek "a series of interesting decisions." If a task is repetitive, it belongs to the machine. If it is meaningful, it belongs to the Architect.

### 5. The Perfect Day is the Unit of Life
We do not wait for the year to be successful. We win the 24 hours in front of us.
`;

export const AGENT_SCHEMAS: AgentSchema[] = [
  {
    name: "The Strategist",
    role: "Global Planning & Resource Allocation",
    primaryDirective: "Synthesize family goals into a 4X-style tech tree and expansion plan.",
    notionProperties: ["Status", "Priority", "Tech Tree Node", "Resource Cost (Time/Money)"],
    failureHandling: "If goals conflict, defer to 'The Sovereign' (Human) for manual override."
  },
  {
    name: "The Archivist",
    role: "Knowledge Management & Context Replay",
    primaryDirective: "Compress daily interactions into high-density context blocks for fast retrieval.",
    notionProperties: ["Source Date", "Context Compression", "Key Takeaways", "Linked Entities"],
    failureHandling: "If context is ambiguous, request clarification via 'Human-in-the-loop' prompt."
  },
  {
    name: "The Quartermaster",
    role: "Logistics & Supply Chain",
    primaryDirective: "Automate recurring household and professional procurement.",
    notionProperties: ["Inventory Level", "Reorder Point", "Cost Optimization", "Delivery Status"],
    failureHandling: "In case of price surge, provide 3 alternatives to 'The Sovereign'."
  }
];

export const CORE_QUESTS: Quest[] = [
  { id: '1', title: 'Found the Capital', category: 'Empire', difficulty: 'Easy', xp: 50, completed: false },
  { id: '2', title: 'Morning Ritual of the Sovereign', category: 'Body', difficulty: 'Medium', xp: 100, completed: false },
  { id: '3', title: 'Deep Work Deep Strike', category: 'Empire', difficulty: 'Medium', xp: 150, completed: false },
  { id: '4', title: 'The Family Council Meeting', category: 'Family', difficulty: 'Medium', xp: 120, completed: false },
  { id: '5', title: 'Deploy the Archivist Agent', category: 'Empire', difficulty: 'Hard', xp: 300, completed: false },
  { id: '6', title: '24-Hour Digital Silence', category: 'Mind', difficulty: 'Hard', xp: 400, completed: false },
  { id: '7', title: 'Physical Limit Testing (Max Reps)', category: 'Body', difficulty: 'Hard', xp: 200, completed: false },
  { id: '8', title: 'Strategic Legacy Planning', category: 'Mind', difficulty: 'Legendary', xp: 1000, completed: false },
  { id: '9', title: 'Automated Revenue Stream Setup', category: 'Empire', difficulty: 'Legendary', xp: 800, completed: false },
  { id: '10', title: 'The Perfect Day Strike', category: 'Mind', difficulty: 'Medium', xp: 250, completed: false },
];

export const PERFECT_DAY_FLOW: DayActivity[] = [
  { time: '05:30', activity: 'Wake Up / Cold Plunge / Hydration', category: 'Body' },
  { time: '06:00', activity: 'Deep Work Session 1 (Strategic)', category: 'Empire' },
  { time: '08:00', activity: 'Family Breakfast / School Run', category: 'Family' },
  { time: '09:30', activity: 'Tactical Execution / Agent Sync', category: 'Empire' },
  { time: '12:00', activity: 'Zone 2 Training / Podcast Learning', category: 'Body' },
  { time: '14:00', activity: 'High Level Meetings / Creative Flow', category: 'Empire' },
  { time: '17:00', activity: 'Digital Shutdown / Physical Play', category: 'Mind' },
  { time: '18:30', activity: 'Family Dinner (No Screens)', category: 'Family' },
  { time: '20:30', activity: 'Review Quests / Set Next Day Intent', category: 'Mind' },
  { time: '21:30', activity: 'Sleep Protocol Init', category: 'Body' },
];
