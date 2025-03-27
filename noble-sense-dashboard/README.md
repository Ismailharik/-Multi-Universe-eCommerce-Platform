# Admin-Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




#Plugins installed

ngx-scrollbar
angular-material
angular-tabler-icons
ngx-permissions
ngx-pagination



May I have to to remove "@angular/material/prebuilt-themes/indigo-pink.css" letter as i have my custom themes
I will need to install the library  "node_modules/angular-calendar/css/angular-calendar.css" library when I will need the calendar page


The nav bar I have used is the horizontal , may I will delete the vertical


#Completed customers page

#Make if the order completed user can't change the order any more and reduce its balance by the total price

#Icons used
Font Awesome

# we will consider that main dishes exist the category of id 1

## when I update image I send request to add image and second one go by mistake to update again product
## I have to separate add image from update product
## later I will need to implement ngx-toastr

# cmd to redeploy to s3 bucket
aws s3 sync ./dist/ns-dashboard s3://ns-admin-interface --delete
# cmd to invalidate cloudfront

