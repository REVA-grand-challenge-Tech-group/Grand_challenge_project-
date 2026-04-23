# KrishiSetu Database Schema

## Collections (Tables)

### 1. Users
- name (String)
- phone (String, unique)
- role (farmer/labour/both)
- location (String)

### 2. Crops
- name (String)
- currentPrice (Number)
- previousPrice (Number)
- demand (String)

### 3. Labour
- name (String)
- skills (Array)
- location (String)
- isAvailable (Boolean)

### 4. Messages
- senderId (String)
- receiverId (String)
- message (String)
- timestamp (Date)

### 5. Mandi
- name (String)
- location (String)
- crops (Array)