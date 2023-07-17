import DrawerLeft from '../components/drawer'
function User({ quotas, user }) {
  return (
    <div>
        <DrawerLeft 
          quota={quotas.normalQuota}
          colorQuota={quotas.colorQuota}
          user={user}
        />
    </div>
  )
}

export default User