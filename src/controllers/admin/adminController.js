import { getAdminSummary, getAllUsersForAdmin,updateUserRole, getCategoryCount, getAdvisorRequestCount,} from "../../models/admin/adminModel.js";
import { getAllCategories, getCategoryById, createCategories, updateCategory, deleteCategory, } from "../../models/category/categoryModel.js";

// Display the main admin dashboard.

async function buildAdminDashboard(req,res,next) {
    try {
        const [summary, totalCategories, totalRequests] = await Promise.all([
            getAdminSummary(),
            getCategoryCount(),
            getAdvisorRequestCount(),
        ]);

        return res.render("admin/dashboard", {
            title: "Admin Dashboard",
            summary: {
                ...summary,
                total_categories: totalCategories,
                total_requests: totalRequests,
            },
        });
    } catch (error) {
        next(error);
    }
}

// Display all users for administrator management.

async function buildAdminUsers(req,res,next){
    try {
        const users = await getAllUsersForAdmin();

        return res.render("admin/users", {
            title: "Manage Users",
            users,
        });
    } catch (error) {
        next(error);
    }
}

//  Update a user's application role

async function changeUserRole(req,res,next) {
    try {
        const userId = Number(req.params.userId);
        const role = req.body.role;
        const currentadminId = Number(req.session.user.userId);

        if (userId === currentadminId) {
            req.flash("error", "You cannot change your own administrator role.");
            return res.redirect("/admin/users");
        }
        const updatedUser = await updateUserRole(userId, role);
    
        if (!updatedUser) {
            req.flash("error", "User not found.");
            return res.redirect("/admin/users");
        }

        req.flash("success",  `${updatedUser.first_name} ${updatedUser.last_name}'s role was updated successfully.`);
        return res.redirect("/admin/users");
    } catch (error) {
        next(error);
    }
}

// Display all categories and the category creation form.

async function buildAdminCategories(req,res,next) {
    try {
        const categories = await getAllCategories();

        return res.render("admin/categories", {
            title: "Manage Categories",
            categories,
        });
    } catch (error) {
        next(error);
    }
}

//  Create a new transaction category

async function addCategory(req,res,next) {
    try {
        await createCategories({
            name: req.body.name,
            description: req.body.description,
        });
        req.flash("success", "Category created successfully.");
        return res.redirect("/admin/categories");
    } catch (error) {
        // PostgreSQL unique constraint violation
        if (error.code === "23505") {
            req.flash("error", "A category with that name already exists.");
            return res.redirect("/admin/categories");
        }
        next(error);
    }
}

/**
 * Display the category editing form.
 */
async function buildEditCategory(req, res, next) {
  try {
    const categoryId = Number(req.params.categoryId);
    const category = await getCategoryById(categoryId);

    if (!category) {
      req.flash("error", "Category not found.");
      return res.redirect("/admin/categories");
    }

    return res.render("admin/editCategory", {
      title: "Edit Category",
      category,
    });
  } catch (error) {
    next(error);
  }
}

// Update an existing transaction category

async function editCategory(req, res, next) {
    try {
        const categoryId = Number(req.params.categoryId);

        const updatedCategory = await updateCategory(categoryId, {
        name: req.body.name,
        description: req.body.description,
        });

        if (!updatedCategory) {
        req.flash("error", "Category not found.");
        return res.redirect("/admin/categories");
        }

        req.flash("success", "Category updated successfully.");
        return res.redirect("/admin/categories");
    } catch (error) {
        if (error.code === "23505") {
        req.flash("error", "A category with that name already exists.");

        return res.redirect(
            `/admin/categories/${req.params.categoryId}/edit`,
        );
        }

        next(error);
    }
}

/**
 * Delete an existing transaction category.
 */
async function removeCategory(req, res, next) {
    try {
        const categoryId = Number(req.params.categoryId);
        const deletedCategory = await deleteCategory(categoryId);

        if (!deletedCategory) {
        req.flash("error", "Category not found.");
        return res.redirect("/admin/categories");
        }

        req.flash("success", "Category deleted successfully.");
        return res.redirect("/admin/categories");
    } catch (error) {
        // Foreign-key violation: the category is currently in use.
        if (error.code === "23503") {
        req.flash(
            "error",
            "This category cannot be deleted because it is being used by transactions or budgets.",
        );

        return res.redirect("/admin/categories");
        }

        next(error);
    }
}

export { buildAdminDashboard, buildAdminUsers, changeUserRole, buildAdminCategories, addCategory, buildEditCategory, editCategory, removeCategory, };