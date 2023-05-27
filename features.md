# API end points 

### register
- api/register
```
?status:
    reply: success, failed
?register:
    arguments: name, phone_no, firebase_id
    reply: success, failed
```
### sendAlert
- api/sendalert
    <br> sendalert?username=&location=
```json
{
    status: success/fail
}
```
### list alerts
- api/listalerts
```json
{
    alertCount:  $number,
    alerts:[
        {
            username: $username,
            time: $time,
            location: $location,
            contents: $content,
            bloodgroup: $bloodgroup,
        },
        {
            username: $username,
            time: $time,
            location: $location,
            contents: $content,
            bloodgroup: $bloodgroup,
        },
    ],
}
```
### getprofiledetails
- api/profile
```
{
    name:
    contents: $content,
    bloodgroup: $bloodgroup,
}
```