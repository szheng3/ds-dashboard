// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // console.log(localStorage.getItem('antd-pro-authority'));
  // return ["ROLE_ADMIN"] ;
  let authority = localStorage.getItem('antd-pro-authority');
  if (authority) {
    if (authority.includes('[')) {
      authority = JSON.parse(authority);
    } else {
      authority = [authority];
    }
  } else {
    authority = ['ROLE_ADMIN', 'ROLE_USER'];
  }
  console.log(authority);
  return authority;
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', JSON.stringify(authority));
}
