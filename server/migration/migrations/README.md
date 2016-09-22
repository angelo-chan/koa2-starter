# Get started migration

## How to name migration file

migration file should be ordered by the file name, the recommend file name should be:

 - **001-add-email-to-user**, 
 - **002-add-active-to-user**

## How to write migration file

```
import User from '../../models/user.model';

export default function (next) {
  const user = new User({ username: 'koa2', password: 'koa2' });
  user.save().then(() => {
    next();
    return null;
  }).catch((err) => next(err));
}
```

## How to run migration

```
make migrate-local
```
