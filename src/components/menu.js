export const menuItems = [
    {
        id: 1,
        label: "menuitems.dvcai.hosts",
        icon: "bx-server",
        link: "/hosts",
        roles: ["DOCKHUB_ADMIN"]
    },
    {
        id: 2,
        label: "menuitems.dvcai.projects",
        icon: "bx-briefcase-alt-2",
        link: "/projects"
    },
    {
        id: 3,
        label: "menuitems.dvcai.datasets",
        icon: "bx-data",
        link: "/datasets"
    },
    {
        id: 4,
        label: "menuitems.dvcai.images",
        icon: "mdi mdi-docker",
        link: "/images"
    },
    {
        id: 5,
        label: "menuitems.dvcai.containers",
        icon: "bx-cube",
        link: "/containers"
    },
    {
        id: 6,
        label: "menuitems.dvcai.file",
        icon: "bx-file",
        link: "/file"
    }
    // {
    //     id: 1,
    //     label: "menuitems.menu.text",
    //     isTitle: true
    // },
    // {
    //     id: 2,
    //     label: "menuitems.dashboards.text",
    //     icon: "bx-home-circle",
    //     badge: {
    //         variant: "info",
    //         text: "menuitems.dashboards.badge"
    //     },
    //     subItems: [
    //         {
    //             id: 3,
    //             label: "menuitems.dashboards.list.default",
    //             link: "/",
    //             parentId: 2
    //         },
    //         {
    //             id: 4,
    //             label: "menuitems.dashboards.list.saas",
    //             link: "/dashboard/saas",
    //             parentId: 2
    //         },
    //         {
    //             id: 5,
    //             label: "menuitems.dashboards.list.crypto",
    //             link: "/dashboard/crypto",
    //             parentId: 2
    //         },
    //         {
    //             id: 6,
    //             label: "menuitems.dashboards.list.blog",
    //             link: "/dashboard/blog",
    //             parentId: 2
    //         }
    //     ]
    // },
    // {
    //     id: 7,
    //     isLayout: true
    // },
    // {
    //     id: 8,
    //     label: "menuitems.apps.text",
    //     isTitle: true
    // },
    // {
    //     id: 9,
    //     label: "menuitems.calendar.text",
    //     icon: "bx-calendar",
    //     link: "/calendar"
    // },
    // {
    //     id: 10,
    //     label: "menuitems.chat.text",
    //     icon: "bx-chat",
    //     link: "/chat",
    // },
    // {
    //     id: 11,
    //     label: "menuitems.filemanager.text",
    //     link: "/apps/file-manager",
    //     icon: "bx-file",
    //     badge: {
    //         variant: "success",
    //         text: "menuitems.chat.badge"
    //     }
    // },
    // {
    //     id: 12,
    //     label: "menuitems.ecommerce.text",
    //     icon: "bx-store",
    //     subItems: [
    //         {
    //             id: 13,
    //             label: "menuitems.ecommerce.list.products",
    //             link: "/ecommerce/products",
    //             parentId: 12
    //         },
    //         {
    //             id: 14,
    //             label: "menuitems.ecommerce.list.productdetail",
    //             link: "/ecommerce/product-detail/1",
    //             parentId: 12
    //         },
    //         {
    //             id: 15,
    //             label: "menuitems.ecommerce.list.orders",
    //             link: "/ecommerce/orders",
    //             parentId: 12
    //         },
    //         {
    //             id: 16,
    //             label: "menuitems.ecommerce.list.customers",
    //             link: "/ecommerce/customers",
    //             parentId: 12
    //         },
    //         {
    //             id: 17,
    //             label: "menuitems.ecommerce.list.cart",
    //             link: "/ecommerce/cart",
    //             parentId: 12
    //         },
    //         {
    //             id: 18,
    //             label: "menuitems.ecommerce.list.checkout",
    //             link: "/ecommerce/checkout",
    //             parentId: 12
    //         },
    //         {
    //             id: 19,
    //             label: "menuitems.ecommerce.list.shops",
    //             link: "/ecommerce/shops",
    //             parentId: 12
    //         },
    //         {
    //             id: 20,
    //             label: "menuitems.ecommerce.list.addproduct",
    //             link: "/ecommerce/add-product",
    //             parentId: 12
    //         }
    //     ]
    // },
    // {
    //     id: 21,
    //     label: "menuitems.crypto.text",
    //     icon: "bx-bitcoin",
    //     subItems: [
    //         {
    //             id: 22,
    //             label: "menuitems.crypto.list.wallet",
    //             link: "/crypto/wallet",
    //             parentId: 21
    //         },
    //         {
    //             id: 23,
    //             label: "menuitems.crypto.list.buy/sell",
    //             link: "/crypto/buy-sell",
    //             parentId: 21
    //         },
    //         {
    //             id: 24,
    //             label: "menuitems.crypto.list.exchange",
    //             link: "/crypto/exchange",
    //             parentId: 21
    //         },
    //         {
    //             id: 25,
    //             label: "menuitems.crypto.list.lending",
    //             link: "/crypto/lending",
    //             parentId: 21
    //         },
    //         {
    //             id: 26,
    //             label: "menuitems.crypto.list.orders",
    //             link: "/crypto/orders",
    //             parentId: 21
    //         },
    //         {
    //             id: 27,
    //             label: "menuitems.crypto.list.kycapplication",
    //             link: "/crypto/kyc-application",
    //             parentId: 21
    //         },
    //         {
    //             id: 28,
    //             label: "menuitems.crypto.list.icolanding",
    //             link: "/crypto/ico-landing",
    //             parentId: 21
    //         }
    //     ]
    // },
    // {
    //     id: 29,
    //     label: "menuitems.email.text",
    //     icon: "bx-envelope",
    //     subItems: [
    //         {
    //             id: 30,
    //             label: "menuitems.email.list.inbox",
    //             link: "/email/inbox",
    //             parentId: 29
    //         },
    //         {
    //             id: 31,
    //             label: "menuitems.email.list.reademail",
    //             link: "/email/reademail/1",
    //             parentId: 29
    //         },
    //         {
    //             id: 32,
    //             label: "menuitems.email.list.template.text",
    //             parentId: 29,
    //             subItems: [
    //                 {
    //                     id: 33,
    //                     label: 'menuitems.email.list.template.list.basic',
    //                     link: '/email/templates/basic',
    //                     parentId: 32
    //                 },
    //                 {
    //                     label: 'menuitems.email.list.template.list.alert',
    //                     link: '/email/templates/alert',
    //                     parentId: 32
    //                 },
    //                 {
    //                     label: 'menuitems.email.list.template.list.billing',
    //                     link: '/email/templates/billing',
    //                     parentId: 32
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: 34,
    //     label: "menuitems.invoices.text",
    //     icon: "bx-receipt",
    //     subItems: [
    //         {
    //             id: 35,
    //             label: "menuitems.invoices.list.invoicelist",
    //             link: "/invoices/list",
    //             parentId: 34
    //         },
    //         {
    //             id: 36,
    //             label: "menuitems.invoices.list.invoicedetail",
    //             link: "/invoices/detail",
    //             parentId: 34
    //         }
    //     ]
    // },
    // {
    //     id: 37,
    //     label: "menuitems.projects.text",
    //     icon: "bx-briefcase-alt-2",
    //     subItems: [
    //         {
    //             id: 38,
    //             label: "menuitems.projects.list.grid",
    //             link: "/projects/grid",
    //             parentId: 37
    //         },
    //         {
    //             id: 39,
    //             label: "menuitems.projects.list.projectlist",
    //             link: "/projects/list",
    //             parentId: 37
    //         },
    //         {
    //             id: 40,
    //             label: "menuitems.projects.list.overview",
    //             link: "/projects/overview",
    //             parentId: 37
    //         },
    //         {
    //             id: 41,
    //             label: "menuitems.projects.list.create",
    //             link: "/projects/create",
    //             parentId: 37
    //         }
    //     ]
    // },
    // {
    //     id: 42,
    //     label: "menuitems.tasks.text",
    //     icon: "bx-task",
    //     subItems: [
    //         {
    //             id: 43,
    //             label: "menuitems.tasks.list.tasklist",
    //             link: "/tasks/list",
    //             parentId: 42
    //         },
    //         {
    //             id: 44,
    //             label: "menuitems.tasks.list.kanban",
    //             link: "/tasks/kanban",
    //             parentId: 42
    //         },
    //         {
    //             id: 45,
    //             label: "menuitems.tasks.list.createtask",
    //             link: "/tasks/create",
    //             parentId: 42
    //         }
    //     ]
    // },
    // {
    //     id: 46,
    //     label: "menuitems.contacts.text",
    //     icon: "bxs-user-detail",
    //     subItems: [
    //         {
    //             id: 47,
    //             label: "menuitems.contacts.list.usergrid",
    //             link: "/contacts/grid",
    //             parentId: 46
    //         },
    //         {
    //             id: 48,
    //             label: "menuitems.contacts.list.userlist",
    //             link: "/contacts/list",
    //             parentId: 46
    //         },
    //         {
    //             id: 49,
    //             label: "menuitems.contacts.list.profile",
    //             link: "/contacts/profile",
    //             parentId: 46
    //         }
    //     ]
    // },
    // {
    //     id: 50, 
    //     label: "menuitems.blog.text",
    //     icon: "bx-detail",
    //     badge: {
    //         variant: "success",
    //         text: "menuitems.blog.badge"
    //     },
    //     subItems: [
    //         {
    //             id: 51,
    //             label: 'menuitems.blog.list.bloglist',
    //             link: '/blog/list',
    //             parentId: 50
    //         },
    //         {
    //             id: 52,
    //             label: 'menuitems.blog.list.grid',
    //             link: '/blog/grid',
    //             parentId: 50
    //         },
    //         {
    //             id: 53,
    //             label: 'menuitems.blog.list.detail',
    //             link: '/blog/detail',
    //             parentId: 50
    //         }
    //     ]
    // },
    // {
    //     id: 54,
    //     label: "menuitems.pages.text",
    //     isTitle: true
    // },
    // {
    //     id: 55,
    //     label: "menuitems.authentication.text",
    //     icon: "bx-user-circle",
    //     badge: {
    //         variant: "success",
    //         text: "menuitems.authentication.badge"
    //     },
    //     subItems: [
    //         {
    //             id: 56,
    //             label: "menuitems.authentication.list.login",
    //             link: "/auth/login-1",
    //             parentId: 55
    //         },
    //         {
    //             id: 57,
    //             label: "menuitems.authentication.list.login-2",
    //             link: "/auth/login-2",
    //             parentId: 55
    //         },
    //         {
    //             id: 58,
    //             label: "menuitems.authentication.list.register",
    //             link: "/auth/register-1",
    //             parentId: 55
    //         },
    //         {
    //             id: 59,
    //             label: "menuitems.authentication.list.register-2",
    //             link: "/auth/register-2",
    //             parentId: 55
    //         },
    //         {
    //             id: 60,
    //             label: "menuitems.authentication.list.recoverpwd",
    //             link: "/auth/recoverpwd",
    //             parentId: 55
    //         },
    //         {
    //             id: 61,
    //             label: "menuitems.authentication.list.recoverpwd-2",
    //             link: "/auth/recoverpwd-2",
    //             parentId: 55
    //         },
    //         {
    //             id: 62,
    //             label: "menuitems.authentication.list.lockscreen",
    //             link: "/auth/lock-screen",
    //             parentId: 55
    //         },
    //         {
    //             id: 63,
    //             label: "menuitems.authentication.list.lockscreen-2",
    //             link: "/auth/lock-screen-2",
    //             parentId: 55
    //         },
    //         {
    //             id: 64,
    //             label: "menuitems.authentication.list.confirm-mail",
    //             link: "/auth/confirm-mail",
    //             parentId: 55
    //         },
    //         {
    //             id: 65,
    //             label: "menuitems.authentication.list.confirm-mail-2",
    //             link: "/auth/confirm-mail-2",
    //             parentId: 55
    //         },
    //         {
    //             id: 66,
    //             label: "menuitems.authentication.list.verification",
    //             link: "/auth/email-verification",
    //             parentId: 55
    //         },
    //         {
    //             id: 67,
    //             label: "menuitems.authentication.list.verification-2",
    //             link: "/auth/email-verification-2",
    //             parentId: 55
    //         },
    //         {
    //             id: 68,
    //             label: "menuitems.authentication.list.verification-step",
    //             link: "/auth/two-step-verification",
    //             parentId: 55
    //         },
    //         {
    //             id: 69,
    //             label: "menuitems.authentication.list.verification-step-2",
    //             link: "/auth/two-step-verification-2",
    //             parentId: 55
    //         }
    //     ]
    // },
    // {
    //     id: 70,
    //     label: "menuitems.utility.text",
    //     icon: "bx-file",
    //     subItems: [
    //         {
    //             id: 71,
    //             label: "menuitems.utility.list.starter",
    //             link: "/pages/starter",
    //             parentId: 70
    //         },
    //         {
    //             id: 72,
    //             label: "menuitems.utility.list.maintenance",
    //             link: "/pages/maintenance",
    //             parentId: 70
    //         },
    //         {
    //             id: 72,
    //             label: "menuitems.utility.list.comingsoon",
    //             link: "/pages/coming-soon",
    //             parentId: 70
    //         },
    //         {
    //             id: 73,
    //             label: "menuitems.utility.list.timeline",
    //             link: "/pages/timeline",
    //             parentId: 70
    //         },
    //         {
    //             id: 74,
    //             label: "menuitems.utility.list.faqs",
    //             link: "/pages/faqs",
    //             parentId: 70
    //         },
    //         {
    //             id: 75,
    //             label: "menuitems.utility.list.pricing",
    //             link: "/pages/pricing",
    //             parentId: 70
    //         },
    //         {
    //             id: 76,
    //             label: "menuitems.utility.list.error404",
    //             link: "/pages/404",
    //             parentId: 70
    //         },
    //         {
    //             id: 77,
    //             label: "menuitems.utility.list.error500",
    //             link: "/pages/500",
    //             parentId: 70
    //         }
    //     ]
    // },
    // {
    //     id: 78,
    //     label: "menuitems.components.text",
    //     isTitle: true
    // },
    // {
    //     id: 79,
    //     label: "menuitems.uielements.text",
    //     icon: "bx-tone",
    //     subItems: [
    //         {
    //             id: 80,
    //             label: "menuitems.uielements.list.alerts",
    //             link: "/ui/alerts",
    //             parentId: 79
    //         },
    //         {
    //             id: 81,
    //             label: "menuitems.uielements.list.buttons",
    //             link: "/ui/buttons",
    //             parentId: 79
    //         },
    //         {
    //             id: 82,
    //             label: "menuitems.uielements.list.cards",
    //             link: "/ui/cards",
    //             parentId: 79
    //         },
    //         {
    //             id: 83,
    //             label: "menuitems.uielements.list.carousel",
    //             link: "/ui/carousel",
    //             parentId: 79
    //         },
    //         {
    //             id: 84,
    //             label: "menuitems.uielements.list.dropdowns",
    //             link: "/ui/dropdowns",
    //             parentId: 79
    //         },
    //         {
    //             id: 85,
    //             label: "menuitems.uielements.list.grid",
    //             link: "/ui/grid",
    //             parentId: 79
    //         },
    //         {
    //             id: 86,
    //             label: "menuitems.uielements.list.images",
    //             link: "/ui/images",
    //             parentId: 79
    //         },
    //         {
    //             id: 87,
    //             label: "menuitems.uielements.list.modals",
    //             link: "/ui/modals",
    //             parentId: 79
    //         },
    //         {
    //             id: 88,
    //             label: "menuitems.uielements.list.rangeslider",
    //             link: "/ui/rangeslider",
    //             parentId: 79
    //         },
    //         {
    //             id: 89,
    //             label: "menuitems.uielements.list.progressbar",
    //             link: "/ui/progressbars",
    //             parentId: 79
    //         },
    //         {
    //             id: 90,
    //             label: "menuitems.uielements.list.sweetalert",
    //             link: "/ui/sweet-alert",
    //             parentId: 79
    //         },
    //         {
    //             id: 91,
    //             label: "menuitems.uielements.list.tabs",
    //             link: "/ui/tabs-accordions",
    //             parentId: 79
    //         },
    //         {
    //             id: 92,
    //             label: "menuitems.uielements.list.typography",
    //             link: "/ui/typography",
    //             parentId: 79
    //         },
    //         {
    //             id: 93,
    //             label: "menuitems.uielements.list.video",
    //             link: "/ui/video",
    //             parentId: 79
    //         },
    //         {
    //             id: 94,
    //             label: "menuitems.uielements.list.general",
    //             link: "/ui/general",
    //             parentId: 79
    //         },
    //         {
    //             id: 95,
    //             label: "menuitems.uielements.list.colors",
    //             link: "/ui/colors",
    //             parentId: 79
    //         },
    //         {
    //             id: 96,
    //             label: "menuitems.uielements.list.lightbox",
    //             link: "/ui/lightbox",
    //             parentId: 79
    //         },
    //         {
    //             id: 97,
    //             label: "menuitems.uielements.list.cropper",
    //             link: "/ui/image-cropper",
    //             parentId: 79
    //         }
    //     ]
    // },
    // {
    //     id: 98,
    //     label: "menuitems.forms.text",
    //     icon: "bxs-eraser",
    //     badge: {
    //         variant: "danger",
    //         text: 'menuitems.forms.badge'
    //     },
    //     subItems: [
    //         {
    //             id: 99,
    //             label: "menuitems.forms.list.elements",
    //             link: "/form/elements",
    //             parentId: 98
    //         },
    //         {
    //             id: 100,
    //             label: "menuitems.forms.list.layouts",
    //             link: "/form/layouts",
    //             parentId: 98
    //         },
    //         {
    //             id: 101,
    //             label: "menuitems.forms.list.validation",
    //             link: "/form/validation",
    //             parentId: 98
    //         },
    //         {
    //             id: 102,
    //             label: "menuitems.forms.list.advanced",
    //             link: "/form/advanced",
    //             parentId: 98
    //         },
    //         {
    //             id: 103,
    //             label: "menuitems.forms.list.editor",
    //             link: "/form/editor",
    //             parentId: 98
    //         },
    //         {
    //             id: 104,
    //             label: "menuitems.forms.list.fileupload",
    //             link: "/form/uploads",
    //             parentId: 98
    //         },
    //         {
    //             id: 105,
    //             label: "menuitems.forms.list.repeater",
    //             link: "/form/repeater",
    //             parentId: 98
    //         },
    //         {
    //             id: 106,
    //             label: "menuitems.forms.list.wizard",
    //             link: "/form/wizard",
    //             parentId: 98
    //         },
    //         {
    //             id: 107,
    //             label: "menuitems.forms.list.mask",
    //             link: "/form/mask",
    //             parentId: 98
    //         }
    //     ]
    // },
    // {
    //     id: 108,
    //     icon: "bx-list-ul",
    //     label: "menuitems.tables.text",
    //     subItems: [
    //         {
    //             id: 109,
    //             label: "menuitems.tables.list.basic",
    //             link: "/tables/basic",
    //             parentId: 108
    //         },
    //         {
    //             id: 110,
    //             label: "menuitems.tables.list.advanced",
    //             link: "/tables/advanced",
    //             parentId: 108
    //         }
    //     ]
    // },
    // {
    //     id: 111,
    //     icon: "bxs-bar-chart-alt-2",
    //     label: "menuitems.charts.text",
    //     subItems: [
    //         {
    //             id: 112,
    //             label: "menuitems.charts.list.apex",
    //             link: "/charts/apex",
    //             parentId: 111
    //         },
    //         {
    //             id: 113,
    //             label: "menuitems.charts.list.chartjs",
    //             link: "/charts/chartjs",
    //             parentId: 111
    //         },
    //         {
    //             id: 114,
    //             label: "menuitems.charts.list.chartist",
    //             link: "/charts/chartist",
    //             parentId: 111
    //         },
    //         {
    //             id: 115,
    //             label: "menuitems.charts.list.echart",
    //             link: "/charts/echart",
    //             parentId: 111
    //         }
    //     ]
    // },
    // {
    //     id: 116,
    //     label: "menuitems.icons.text",
    //     icon: "bx-aperture",
    //     subItems: [
    //         {
    //             id: 117,
    //             label: "menuitems.icons.list.boxicons",
    //             link: "/icons/boxicons",
    //             parentId: 116
    //         },
    //         {
    //             id: 118,
    //             label: "menuitems.icons.list.materialdesign",
    //             link: "/icons/materialdesign",
    //             parentId: 116
    //         },
    //         {
    //             id: 119,
    //             label: "menuitems.icons.list.dripicons",
    //             link: "/icons/dripicons",
    //             parentId: 116
    //         },
    //         {
    //             id: 120,
    //             label: "menuitems.icons.list.fontawesome",
    //             link: "/icons/fontawesome",
    //             parentId: 116
    //         }
    //     ]
    // },
    // {
    //     id: 121,
    //     label: "menuitems.maps.text",
    //     icon: "bx-map",
    //     subItems: [
    //         {
    //             id: 122,
    //             label: "menuitems.maps.list.googlemap",
    //             link: "/maps/google",
    //             parentId: 121
    //         },
    //         {
    //             id: 123,
    //             label: "menuitems.maps.list.leafletmap",
    //             link: "/maps/leaflet",
    //             parentId: 121
    //         },
    //     ]
    // },
    // {
    //     id: 124,
    //     label: "menuitems.multilevel.text",
    //     icon: "bx-share-alt",
    //     subItems: [
    //         {
    //             id: 125,
    //             label: "menuitems.multilevel.list.level1.1",
    //             link: "#",
    //             parentId: 124
    //         },
    //         {
    //             id: 126,
    //             label: "menuitems.multilevel.list.level1.2",
    //             parentId: 124,
    //             subItems: [
    //                 {
    //                     id: 127,
    //                     label: "menuitems.multilevel.list.level1.level2.1",
    //                     link: "#",
    //                     parentId: 124
    //                 },
    //                 {
    //                     id: 128,
    //                     label: "menuitems.multilevel.list.level1.level2.2",
    //                     link: "#",
    //                     parentId: 124
    //                 }
    //             ]
    //         }
    //     ]
    // }
];

