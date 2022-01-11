export class Request {
 first_name:string;
 requestname:string;
    "requesterid": number;  
    "requestparameters": { 
        "first_name": string; 
        "last_name": string; 
        "qualification": string; 
        "clinic": string; 
        "email": string; 
        "registration_code": string; 
        "mobile": string; 
        "password": string;
     }

     constructor(first_name,requestname)
     {
        this.first_name = first_name;
        this.requestname =requestname;
        // this.requestname = requestname;
     }
}
