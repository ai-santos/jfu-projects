document.addEventListener("DOMContentLoaded", () => {
  console.log('the dom has loaded')
})

 // const projects =
 //  [
 //    {
 //      project_name: "proj1", address: "add1", city: "city1", state: "state1", zip: "12345",
 //      phone: "phone1", contact: "contact1", email: "email1"
 //    },
 //    {
 //      project_name: "proj2", address:"add2",  city: "city2", state: "state2", zip: "12345", phone: "5105757589",
 //      contact: "", email: ""
 //    },
 //    {
 //      project_name: "proj3", address:"add2",  city: "city3", state: "state3", zip: "12345", phone: "5105757589",
 //      contact: "", email: ""
 //    },
 //    {
 //      project_name: "proj4", address:"add2",  city: "city4", state: "state4", zip: "12345", phone: "5105757589",
 //      contact: "", email: ""
 //    },
 //    {
 //      project_name: "proj5", address:"add2",  city: "city5", state: "state5", zip: "12345", phone: "5105757589",
 //      contact: "", email: ""
 //    },
 //    {
 //      project_name: 'proj6', address:"add2",  city: "city6", state: "state6", zip: "12345", phone: "5105757589",
 //      contact: "", email: ""
 //    }
 //  ]

  // let projTemplate = _.template(
  //   '<% _.each(projects, function(project, index, projects) { %>' +
  //     '<div class="col-md-3">'+
  //       '<h5><%= project.project_name %></h5>'+
  //       '<h5><%= project.address %></h5>'+
  //       '<h5><%= project.city %></h5>'+
  //       '<h5><%= project.state %></h5>'+
  //       '<h5><%= project.zip %></h5>'+
  //       '<h5><%= project.phone %></h5>'+
  //       '<h5><%= project.contact %></h5>'+
  //       '<h5><%= project.email %></h5>'+
  //     '</div>' +
  //   '<% }); %>')

  // let content = projTemplate({
  //   projects: projects
  // })

  // const proj_container = document.querySelector('.projects')
  // proj_container.innerHTML = content