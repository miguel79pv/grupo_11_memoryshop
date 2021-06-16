const articulos = [
    {
        id: 1,
        sku: 'ADF32GBS',
        titulo: 'Memoria flash ADATA de 32G',
        foto: '',
        descipcion: 'Memoria Flash Adata de 32 GB, color negro con rojo',
        precio: '149.90',
        caracteristicas : 
            {
                color: 'Gris',
                capacidad: '32 GB',
                marca: 'ADATA',
                velocidad_lectura: '400 bps',
                tipo_memoria: 'Flash'
            }
        
    },
    {
        id: 2,
        sku: 'WD120GBS',
        titulo: 'Western Digital WDSD120G1G0A',
        foto: '',
        descipcion: "SSD Western Digital Green, 120GB, SATA III, 2.5'' ",
        precio: '1,500.00',
        caracteristicas : 
            {
                color: 'Negro',
                capacidad: '120 GB',
                marca: 'Western Digital',
                velocidad_lectura: '300 mbps',
                tipo_memoria: 'SSD'
            }
        
    },
    {
        id: 3,
        sku: 'WD120GBS',
        titulo: 'ADATA RAM DDR4 8GB',
        foto: '',
        descipcion: 'Memoria Ram ADATA DDR4 2666 SO-DIMM',
        precio: '1,500.00',
        caracteristicas : 
            {
                color: 'NA',
                capacidad: '8 GB',
                marca: 'ADATA',
                velocidad_lectura: '333 Mbps',
                tipo_memoria: 'RAM'
            }        
    }
]

const controller = {
    index: (req,res) => {
        const listaDeArticulos = [
            {
                id: 1,
                sku: 'ADF32GBS',
                titulo: 'Memoria flash ADATA de 32G',
                foto: 'ADATA-FLASH-32G.jpg',
                descripcion: 'Memoria Flash Adata de 32 GB, color negro con rojo',
                precio: '149.90',
                caracteristicas : 
                    {
                        color: 'Gris',
                        capacidad: '32 GB',
                        marca: 'ADATA',
                        velocidad_lectura: '400 bps',
                        tipo_memoria: 'Flash'
                    }
                
            },
            {
                id: 2,
                sku: 'WD120GBS',
                titulo: 'Western Digital WDSD120G1G0A',
                foto: 'WD-SSD-120GB.jpg',
                descripcion: "SSD Western Digital Green, 120GB, SATA III, 2.5'' ",
                precio: '1,500.00',
                caracteristicas : 
                    {
                        color: 'Negro',
                        capacidad: '120 GB',
                        marca: 'Western Digital',
                        velocidad_lectura: '300 mbps',
                        tipo_memoria: 'SSD'
                    }
                
            },
            {
                id: 3,
                sku: 'WD120GBS',
                titulo: 'ADATA RAM DDR4 8GB',
                foto: 'ADATA-RAM-8GB.jpg',
                descripcion: 'Memoria Ram ADATA DDR4 2666 SO-DIMM',
                precio: '1,500.00',
                caracteristicas : 
                    {
                        color: 'NA',
                        capacidad: '8 GB',
                        marca: 'ADATA',
                        velocidad_lectura: '333 Mbps',
                        tipo_memoria: 'RAM'
                    }        
            },
            {
                id: 4,
                sku: 'ADF32GBS',
                titulo: 'Hyundai Memory FLASH 32G',
                foto: 'Hyundai-FLASH-16GB.jpg',
                descripcion: 'USB HYUNDAI U2BK/16GAS, Plata, 16 GB',
                precio: '149.90',
                caracteristicas : 
                    {
                        color: 'Plata',
                        capacidad: '32 GB',
                        marca: 'Hyundai',
                        velocidad_lectura: '200 Mbps',
                        tipo_memoria: 'Flash'
                    }        
            },
            {
                id: 5,
                sku: 'WD120GBS',
                titulo: 'Western Digital WDSD120G1G0A',
                foto: 'WD-SSD-120GB.jpg',
                descripcion: "SSD Western Digital Green, 120GB, SATA III, 2.5'' ",
                precio: '1,500.00',
                caracteristicas : 
                    {
                        color: 'Negro',
                        capacidad: '120 GB',
                        marca: 'Western Digital',
                        velocidad_lectura: '300 mbps',
                        tipo_memoria: 'SSD'
                    }
                
            },
            {
                id: 6,
                sku: 'ADF32GBS',
                titulo: 'Memoria flash ADATA de 32G',
                foto: 'ADATA-FLASH-32G.jpg',
                descripcion: 'Memoria Flash Adata de 32 GB, color negro con rojo',
                precio: '149.90',
                caracteristicas : 
                    {
                        color: 'Gris',
                        capacidad: '32 GB',
                        marca: 'ADATA',
                        velocidad_lectura: '400 bps',
                        tipo_memoria: 'Flash'
                    }
                
            },
            {
                id: 7,
                sku: 'ADF32GBS',
                titulo: 'Hyundai Memory FLASH 32G',
                foto: 'Hyundai-FLASH-16GB.jpg',
                descripcion: 'USB HYUNDAI U2BK/16GAS, Plata, 16 GB',
                precio: '149.90',
                caracteristicas : 
                    {
                        color: 'Plata',
                        capacidad: '32 GB',
                        marca: 'Hyundai',
                        velocidad_lectura: '200 Mbps',
                        tipo_memoria: 'Flash'
                    }        
            },
            {
                id: 8,
                sku: 'WD120GBS',
                titulo: 'ADATA RAM DDR4 8GB',
                foto: 'ADATA-RAM-8GB.jpg',
                descripcion: 'Memoria Ram ADATA DDR4 2666 SO-DIMM',
                precio: '1,500.00',
                caracteristicas : 
                    {
                        color: 'NA',
                        capacidad: '8 GB',
                        marca: 'ADATA',
                        velocidad_lectura: '333 Mbps',
                        tipo_memoria: 'RAM'
                    }        
            }
        ]




        return res.render('index', {'articulos': listaDeArticulos});
    },
    carrito: (req,res) => {
        return res.render('carrito');
    },
    detalle: (req,res) => {
        return res.render('detalle');
    },
    login: (req,res) => {
        return res.render('login');
    },
    registro: (req,res) => {
        return res.render('registro');
    },
    editar: (req,res) => {
        return res.render('editar');
    },
    crear: (req,res) => {
        return res.render('crear');
    }
    
}
module.exports = controller;