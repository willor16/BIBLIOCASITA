import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.book.deleteMany()
    await prisma.readingRoute.deleteMany()
    await prisma.news.deleteMany()
    await prisma.location.deleteMany()
    await prisma.adminUser.deleteMany()

    // Create Admin
    await prisma.adminUser.create({
        data: {
            username: 'admin',
            password: '$2b$10$EpWaTgiFbI6J.wMvJ8k1TOpZ/5hQ9./5A.1/1.1.1.1.1.1.1', // "password" hash placeholder, will implement real hash later or use simple check
        },
    })

    // Create News
    await prisma.news.create({
        data: {
            title: 'Inauguración de Bibliocasita',
            description: 'Celebramos la apertura de nuestro nuevo espacio de lectura para la comunidad. Un lugar lleno de magia y aprendizaje.',
            author: 'Wilmer Choxom',
            date: new Date(),
            image: '/images/Descripcion 2.jpg'
        },
    })

    // Create Location
    await prisma.location.create({
        data: {
            name: 'Parque Central',
            description: 'Ubicada en el corazón del parque, accesible para todos los niños y familias.',
            image: '/images/foto 1ra.jpg'
        },
    })

    // Create Route
    const route = await prisma.readingRoute.create({
        data: {
            title: 'Aventura Fantástica',
            tips: 'Lee con imaginación y comparte tus pensamientos.',
            description: 'Una selección de libros para viajar a otros mundos.'
        },
    })

    // Create Book
    await prisma.book.create({
        data: {
            title: 'El Principito',
            author: 'Antoine de Saint-Exupéry',
            description: 'Un clásico sobre la infancia y la naturaleza humana.',
            readingRouteId: route.id,
            image: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg' // Placeholder
        },
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
