import { defineScope } from "https://cdn.jsdelivr.net/gh/Rahmad2830/Leaf@v1.0.0/dist/Leaf.min.js"

defineScope("navbar", ({ targets }) => {
  const mobileNav = targets.mobileNavbar
  const categoryBar = targets.categoryBar
  const sidebarLink = targets.all.sideLink
  const navbarLink = targets.all.navLink
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/"
  
  sidebarLink.forEach(link => {
    const el = link.querySelector("a")
    const linkPath = new URL(el.href).pathname.replace(/\/$/, "") || "/"
    if(linkPath === currentPath) {
      link.classList.add("bg-red-100", "rounded-md")
      const span = link.querySelector("span")
      span.classList.remove("text-gray-400")
      span.classList.add("text-red-500")
    }
  })
  
  navbarLink.forEach(element => {
    const linkPath = new URL(element.href).pathname.replace(/\/$/, "") || "/"
    const isActive = linkPath === "/" 
      ? currentPath === "/" 
      : currentPath.startsWith(linkPath)
  
    if (isActive) {
      element.classList.remove("text-gray-500")
      element.classList.add("text-red-500", "border-b-4", "border-red-500")
    } else {
      element.classList.add("text-gray-500")
      element.classList.remove("text-red-500", "border-b-4", "border-red-500")
    }
  })

  return {
    toggle() {
      mobileNav.hidden = !mobileNav.hidden
    },
    toggleCategory() {
      categoryBar.hidden = !categoryBar.hidden
    }
  }
})

defineScope("sidebar", ({ targets }) => {
  const sidebarLink = targets.all.sideLink
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/"
  
  sidebarLink.forEach(link => {
    const el = link.querySelector("a")
    const linkPath = new URL(el.href).pathname.replace(/\/$/, "") || "/"
    if(linkPath === currentPath) {
      link.classList.add("bg-red-100", "rounded-md")
      const span = link.querySelector("span")
      span.classList.remove("text-gray-400")
      span.classList.add("text-red-500")
    }
  })
  
  return {}
})

defineScope("searchHiragana", ({ root }) => {
  let timeout
  
  function search() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      root.requestSubmit()
    }, 500)
  }
  
  function disconnect() {
    clearTimeout(timeout)
  }
  
  return { search, disconnect }
})

defineScope("categoryChoice", ({ targets, values }) => {
  const choiceLists = targets.all.choice
  
  function changeStatus({ element }) {
    choiceLists.forEach((btn) => {
      btn.classList.remove("bg-red-500", "text-white")
    })
    
    element.classList.add("bg-red-500", "text-white")
  }
  
  return { changeStatus }
})