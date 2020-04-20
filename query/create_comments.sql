CREATE TABLE nodejs.comments(
id INT NOT NULL auto_increment,
commenter INT NOT NULL,
comment VARCHAR(100) NOT NULL,
create_at DATETIME NOT NULL DEFAULT now(),
primary key (id),
INDEX commentier_idx (commenter ASC),
CONSTRAINT commenter
foreign key(commenter)
references nodejs.users (id)
on delete cascade
on update cascade)
comment='덧글'
default charset=utf8
engine=InnoDB;