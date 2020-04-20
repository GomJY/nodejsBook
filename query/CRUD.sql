/*CREATE*/
/*
INSERT INTO nodejs.users (name, age, married, comment)
	values ('peper', 24, 0, '자기소개1');
INSERT INTO nodejs.users (name, age, married, comment)
	values ('miho', 32, 1, '자기소개2');
*/

/*Read*/
/*
SELECT * FROM nodejs.users;
*/
/*where 조건*/
/*
SELECT * FROM nodejs.users WHERE age > 30;
*/
SELECT * FROM nodejs.users ORDER BY age DESC;

/*Update*/
/*
UPDATE nodejs.users SET comment = '바꿀내용' where id = 2;
*/
/*Delete*/
/*
DELETE FROM nodejs.users WHERE id = 2;
*/


    
    


