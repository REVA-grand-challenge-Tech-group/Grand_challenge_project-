# KrishiSetu Database Schema

## Collections (Tables)

### 1. Users
| Field | Type | Description |
|-------|------|-------------|
| \_id | ObjectId | Auto-generated unique ID |
| name | String | Farmer/Labourer full name |
| phone | String (unique) | 10-digit mobile number with +91 |
| role | String | 'farmer', 'labour', or 'both' |
| location | String | Village/District name |
| createdAt | Date | Registration timestamp |

### 2. Crops
| Field | Type | Description |
|-------|------|-------------|
| \_id | ObjectId | Auto-generated unique ID |
| name | String | Crop name (Rice, Wheat, Tomato) |
| price | Number | Current market price (₹/quintal) |
| demand | String | 'High', 'Medium', 'Low', 'Critical' |
| profitPerAcre | Number | Expected profit per acre |
| investmentPerAcre | Number | Cost to grow per acre |
| season | String | 'Kharif', 'Rabi', 'Throughout' |
| trend | String | 'up', 'down', 'stable' |
| imageUrl | String | Crop image URL |

### 3. Jobs
| Field | Type | Description |
|-------|------|-------------|
| \_id | ObjectId | Auto-generated unique ID |
| farmerId | String | ID of farmer who posted |
| crop | String | Crop name |
| workType | String | Harvesting, Ploughing, etc. |
| labourersNeeded | Number | How many workers required |
| wagePerDay | Number | Payment per day (₹) |
| startDate | Date | Work start date |
| endDate | Date | Work end date |
| location | String | Village/District |
| status | String | 'open', 'filled', 'completed' |

### 4. Applications
| Field | Type | Description |
|-------|------|-------------|
| \_id | ObjectId | Auto-generated unique ID |
| jobId | ObjectId | Reference to Job |
| labourerId | String | ID of applying labourer |
| status | String | 'pending', 'accepted', 'rejected' |

### 5. Registrations
| Field | Type | Description |
|-------|------|-------------|
| \_id | ObjectId | Auto-generated unique ID |
| farmerId | String | Farmer registering |
| crop | String | Crop they will grow |
| acres | Number | Land size |
| confirmedPrice | Number | Guaranteed price |
| expectedHarvest | String | Harvest month |
| status | String | 'pending', 'confirmed' |

### 6. Messages
| Field | Type | Description |
|-------|------|-------------|
| \_id | ObjectId | Auto-generated unique ID |
| senderId | String | Who sent the message |
| receiverId | String | Who receives the message |
| message | String | Message content |
| timestamp | Date | When message was sent |

## Relationships
Users (Farmer) ─────┐
│ │
▼ ▼
Jobs ◄──── Applications ──── Users (Labour)
│
▼
Registrations


## Indexes for Performance
- `phone` on Users (unique)
- `status` on Jobs (for filtering open jobs)
- `farmerId` on Jobs (for farmer's jobs)
- `jobId` on Applications (for job applications)