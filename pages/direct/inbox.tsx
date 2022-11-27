import React from 'react'

const inbox = () => {
  return (
    <div>This is where your message stays for a while</div>
  )
}

export default inbox

export async function getServerSideProps() {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })
    return { props: {} }
  }