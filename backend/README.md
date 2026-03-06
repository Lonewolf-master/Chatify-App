Register-account: api/auth/signup

Question: how to get all the users in mongodb except your self
To get all users in MongoDB while excluding yourself, you use the $ne (not equal) operator in your query to filter out your unique identifier (usually _id). 
+ Using Mongoose (Node.js)
    If you are using Mongoose, you can pass your user ID to the find method using the $ne operator: 

const users = await User.find({ 
  _id: { $ne: currentUserId } 
});

_id: The field you want to filter by.
$ne: The MongoDB operator that means "not equal to".
currentUserId: Your own ID (e.g., from req.user.id or session)

+ Using MongoDB Shell (mongosh)
    In the MongoDB Shell, the syntax is similar:

db.users.find({ _id: { $ne: ObjectId("your_id_here") } })

+ Additional Tips
    Excluding by Email: If you don't have the ID handy, you can exclude yourself using your email or username instead: User.find({ email: { $ne: "your@email.com" } }).
    Projection: To return only specific fields (like name and email) while excluding yourself, add a second argument to the find method:

User.find({ _id: { $ne: currentUserId } }, { name: 1, email: 1 })



Question: what is the use of new Set()
    In JavaScript, a Set is a collection of unique values. Think of it as an array that automatically deletes duplicates

+ javascript
    const rawIds = ["userA", "userB", "userA", "userC", "userB"];
    const uniqueIds = new Set(rawIds); 
    // Output: Set { "userA", "userB", "userC" } (Duplicates are gone!)

+ Key Features:
    + No Duplicates: It ignores any value that is already present.
    + Performance: Checking if a value exists in a Set is much faster than searching an Array.
    + Easy Conversion: You can turn it back into a standard array using the spread operator: [...uniqueIds].

    + javascript
        // Get all IDs from messages, then clean them up
        const chatPartnerIds = [...new Set(allMessageIds)]; 