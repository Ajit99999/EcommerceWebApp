export const FormatPrice = (price,val=100)=>{


    return Intl.NumberFormat('en-IN',
    {
        style:"currency",
        currency:"INR",
        maximumFractionDigits:2
    }).format(price/val)
}
