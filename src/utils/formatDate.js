export const formatDate = (date) => {
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    return newDate.toLocaleDateString('Es-mx', options)
}