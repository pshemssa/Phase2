# Database Operations Verification Guide

This guide helps you verify that follow, like, and bookmark operations are working correctly and saving to the database.

## Prerequisites

1. Ensure your database is running and connected
2. Run migrations: `npx prisma migrate dev`
3. Generate Prisma client: `npx prisma generate`

## Verification Steps

### 1. Check Database Schema

Verify the tables exist:
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('follows', 'likes', 'bookmarks');
```

### 2. Test Follow Functionality

1. Sign in as User A
2. Navigate to User B's profile page (`/users/[username]`)
3. Click the "Follow" button
4. Verify in database:
```sql
SELECT * FROM follows WHERE "followerId" = 'user_a_id' AND "followingId" = 'user_b_id';
```
5. Click "Unfollow" and verify the record is deleted

### 3. Test Like Functionality

1. Sign in as a user
2. Navigate to any post
3. Click the heart icon to like
4. Verify in database:
```sql
SELECT * FROM likes WHERE "postId" = 'post_id' AND "userId" = 'user_id';
```
5. Click again to unlike and verify the record is deleted

### 4. Test Bookmark Functionality

1. Sign in as a user
2. Navigate to any post
3. Click the bookmark icon
4. Verify in database:
```sql
SELECT * FROM bookmarks WHERE "postId" = 'post_id' AND "userId" = 'user_id';
```
5. Click again to unbookmark and verify the record is deleted

## Using Prisma Studio

You can also use Prisma Studio to visually inspect the database:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- View all tables
- See real-time data changes
- Verify that operations are saving correctly

## Common Issues

### Issue: Operations not saving

**Solution:**
1. Check browser console for errors
2. Check server logs for database errors
3. Verify DATABASE_URL is correct in `.env`
4. Ensure Prisma client is generated: `npx prisma generate`

### Issue: "Unique constraint violation"

**Solution:**
This means the record already exists. The code should handle this, but if you see this error:
1. Check if you're trying to like/bookmark/follow something you already have
2. Clear the existing record from the database if needed

### Issue: "User not found" or "Post not found"

**Solution:**
1. Verify the user/post exists in the database
2. Check that IDs are being passed correctly
3. Verify authentication is working

## Testing with API Routes Directly

You can test the API routes directly using curl or Postman:

### Like a Post
```bash
curl -X POST http://localhost:3000/api/post/[postId]/like \
  -H "Cookie: next-auth.session-token=your-session-token"
```

### Bookmark a Post
```bash
curl -X POST http://localhost:3000/api/post/[postId]/bookmark \
  -H "Cookie: next-auth.session-token=your-session-token"
```

### Follow a User
```bash
curl -X POST http://localhost:3000/api/users/[username]/follow \
  -H "Cookie: next-auth.session-token=your-session-token"
```

## Expected Database State

After performing operations, you should see:

- **follows table**: Records with `followerId` and `followingId`
- **likes table**: Records with `postId` and `userId`
- **bookmarks table**: Records with `postId` and `userId`

All operations should be persistent - refreshing the page should maintain the state.

