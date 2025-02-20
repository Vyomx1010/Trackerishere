/*
  # Update test user password

  Updates the test user's password to a properly hashed version
*/

UPDATE auth.users
SET encrypted_password = crypt('testpassword123', gen_salt('bf'))
WHERE email = 'test@example.com';