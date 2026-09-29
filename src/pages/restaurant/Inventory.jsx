import { useState, useMemo, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { AuthContext } from '../../context/AuthContext';
import menuData from '../../data/menuData';
import './Inventory.css';

/* ────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────── */

const CATEGORIES = ['All', 'Poke', 'Salads', 'Seasonal', 'Drinks'];
const CATEGORY_OPTIONS = ['Poke', 'Salads', 'Seasonal', 'Drinks'];

const BADGE_OPTIONS = [
  { value: '', label: 'None' },
  { value: 'POPULAR', label: 'POPULAR' },
  { value: 'VEGAN', label: 'VEGAN' },
  { value: 'SEASONAL', label: 'SEASONAL' },
  { value: 'ORGANIC', label: 'ORGANIC' },
  { value: 'NEW', label: 'NEW' },
];

const INITIAL_FORM = {
  name: '',
  category: '',
  price: '',
  description: '',
  image: '',
  badge: '',
  ingredients: '',
  calories: '',
  protein: '',
  available: true,
};

const STORAGE_KEY = 'farsly_menu_items';

/**
 * Load initial menu items: prefer localStorage, fall back to menuData.
 * Ensures every item has an `available` property.
 */
const loadMenuItems = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => ({
          ...item,
          available: item.available !== false,
        }));
      }
    }
  } catch {
    /* ignore parse errors */
  }
  return menuData.map((item) => ({ ...item, available: true }));
};

/* ────────────────────────────────────────────
   Inventory Component
   ──────────────────────────────────────────── */

const Inventory = () => {
  /* ── State ── */
  const [menuItems, setMenuItems] = useState(loadMenuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form modal
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  /* ── Persist to localStorage ── */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
  }, [menuItems]);

  /* ── Staff Navbar ── */
  const staffUser = { name: 'Kitchen Staff', role: 'Staff' };
  const staffLinks = [
    { label: 'Dashboard', href: '/restaurant' },
    { label: 'Orders', href: '/restaurant/orders' },
    { label: 'Inventory', href: '/restaurant/inventory' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  /* ── Filtering & Search ── */
  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== 'All') {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.ingredients || []).some((ing) => ing.toLowerCase().includes(q))
      );
    }
    return items;
  }, [menuItems, activeCategory, searchQuery]);

  const getCategoryCount = (cat) =>
    cat === 'All'
      ? menuItems.length
      : menuItems.filter((i) => i.category === cat).length;

  /* ── Image Upload ── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: 'Please upload a JPG, PNG, or WEBP image.' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image must be smaller than 5 MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
      setErrors((prev) => ({ ...prev, image: '' }));
    };
    reader.readAsDataURL(file);
  };

  /* ── Form Helpers ── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Item name is required (at least 3 characters).';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }
    const priceNum = parseFloat(formData.price);
    if (!formData.price || Number.isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = 'Price must be greater than $0.00.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'Description is required (at least 10 characters).';
    }
    if (!formData.image && !editingItem) {
      newErrors.image = 'Please upload a menu image.';
    } else if (!formData.image) {
      newErrors.image = 'Please upload a menu image.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── CREATE ── */
  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(INITIAL_FORM);
    setErrors({});
    setShowFormModal(true);
  };

  /* ── UPDATE (open edit modal) ── */
  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.replace('$', ''),
      description: item.description,
      image: item.image || '',
      badge: item.badge || '',
      ingredients: (item.ingredients || []).join(', '),
      calories: item.calories || '',
      protein: item.protein || '',
      available: item.available !== false,
    });
    setErrors({});
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setEditingItem(null);
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  /** Handle form submission for both Create and Update. */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const priceNum = parseFloat(formData.price);
    const ingredientsArray = formData.ingredients
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingItem) {
      // ─── UPDATE ───
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
              ...item,
              name: formData.name.trim(),
              category: formData.category,
              price: `$${priceNum.toFixed(2)}`,
              description: formData.description.trim(),
              image: formData.image || null,
              badge: formData.badge || null,
              ingredients: ingredientsArray,
              calories: formData.calories || item.calories,
              protein: formData.protein || item.protein,
              available: formData.available,
            }
            : item
        )
      );
    } else {
      // ─── CREATE ───
      const newItem = {
        id: `item-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        description: formData.description.trim(),
        price: `$${priceNum.toFixed(2)}`,
        calories: formData.calories || '0',
        protein: formData.protein || '0g',
        rating: 0,
        reviewCount: 0,
        badge: formData.badge || null,
        ingredients: ingredientsArray,
        image: formData.image || null,
        available: formData.available,
      };
      setMenuItems((prev) => [newItem, ...prev]);
    }

    closeFormModal();
  };

  /* ── DELETE ── */
  const openDeleteModal = (item) => {
    setDeletingItem(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingItem(null);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      setMenuItems((prev) => prev.filter((item) => item.id !== deletingItem.id));
    }
    closeDeleteModal();
  };

  /* ── AVAILABILITY TOGGLE ── */
  const toggleAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  /* ── Demo reset ── */
  const resetMenu = () => {
    setMenuItems(menuData.map((item) => ({ ...item, available: true })));
  };

  /* ══════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════ */

  return (
    <div className="farsly-inventory-layout">
      <Navbar
        brand="FARSLY"
        links={staffLinks}
        activePath="/restaurant/inventory"
        user={staffUser}
        showFavorites={false}
        showCart={false}
        showAuth={true}
        onLogout={handleLogout}
      />

      <main className="container page-shell">
        <PageHeader
          eyebrow="RESTAURANT PORTAL"
          title="Menu & Inventory"
          description="Manage your restaurant's menu items and availability."
          action={
            <div className="farsly-inventory-header-actions">
              <button
                type="button"
                className="farsly-inventory-demo-btn"
                onClick={resetMenu}
                title="Reset to default menu data"
              >
                Reset Menu
              </button>
              <Button variant="primary" onClick={openCreateModal}>
                + Add Menu Item
              </Button>
            </div>
          }
        />

        {/* ── Toolbar: Search + Category Filters ── */}
        <section className="farsly-inventory-section" aria-label="Menu inventory management">
          <div className="farsly-inventory-toolbar">
            <div className="farsly-inventory-search">
              <svg
                className="farsly-inventory-search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="farsly-inventory-search-input"
                placeholder="Search by name or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div
              className="farsly-inventory-filter-tabs"
              role="group"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`farsly-inventory-filter-tab ${activeCategory === cat ? 'farsly-inventory-filter-tab--active' : ''
                    }`}
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="farsly-inventory-filter-count">
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Items List ── */}
          {menuItems.length === 0 ? (
            <div className="farsly-inventory-empty-card">
              <EmptyState
                title="No Menu Items"
                description="Your menu is empty. Add your first menu item to get started."
              />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="farsly-inventory-empty-card">
              <EmptyState
                title="No Items Found"
                description={`No menu items match your current filter${searchQuery ? ` "${searchQuery}"` : ''
                  }.`}
              />
            </div>
          ) : (
            <div className="farsly-inventory-table-container">
              <table className="farsly-inventory-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className={
                        item.available === false ? 'farsly-inventory-row--soldout' : ''
                      }
                    >
                      <td className="farsly-inventory-cell-item">
                        <div className="farsly-inventory-item-info">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="farsly-inventory-thumb"
                            />
                          ) : (
                            <div className="farsly-inventory-thumb-placeholder">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                            </div>
                          )}
                          <div>
                            <span className="farsly-inventory-item-name">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="farsly-inventory-badge">
                                {item.badge}
                              </span>
                            )}
                            <span className="farsly-inventory-item-desc">
                              {item.description}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="farsly-inventory-cell-category">
                        <span className="farsly-inventory-category-tag">
                          {item.category}
                        </span>
                      </td>
                      <td className="farsly-inventory-cell-price">{item.price}</td>
                      <td className="farsly-inventory-cell-status">
                        <button
                          type="button"
                          className="farsly-inventory-status-toggle"
                          onClick={() => toggleAvailability(item.id)}
                          title={
                            item.available !== false
                              ? 'Mark as Sold Out'
                              : 'Mark as Available'
                          }
                        >
                          {item.available !== false ? (
                            <StatusBadge status="completed">Available</StatusBadge>
                          ) : (
                            <StatusBadge status="cancelled">Sold Out</StatusBadge>
                          )}
                        </button>
                      </td>
                      <td className="farsly-inventory-cell-actions">
                        <button
                          type="button"
                          className="farsly-inventory-action-btn farsly-inventory-action-btn--edit"
                          onClick={() => openEditModal(item)}
                          aria-label={`Edit ${item.name}`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="farsly-inventory-action-btn farsly-inventory-action-btn--delete"
                          onClick={() => openDeleteModal(item)}
                          aria-label={`Delete ${item.name}`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ══════════════════════════════════════
         CREATE / EDIT MODAL
         ══════════════════════════════════════ */}
      {showFormModal && (
        <div className="farsly-inventory-modal-overlay" onClick={closeFormModal}>
          <div
            className="farsly-inventory-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inventory-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="farsly-inventory-modal-header">
              <h2 id="inventory-modal-title" className="farsly-inventory-modal-title">
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <button
                type="button"
                className="farsly-inventory-modal-close"
                onClick={closeFormModal}
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="farsly-inventory-form">
              <div className="farsly-inventory-form-grid">
                {/* Name */}
                <Input
                  label="Item Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Salmon Signature"
                  required
                  error={errors.name}
                />

                {/* Category */}
                <div className="farsly-input-wrapper">
                  <label htmlFor="farsly-select-category" className="farsly-input-label">
                    Category <span className="farsly-input-required">*</span>
                  </label>
                  <select
                    id="farsly-select-category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`farsly-input-field farsly-inventory-select ${errors.category ? 'farsly-input-field--error' : ''
                      }`}
                  >
                    <option value="">Select category...</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="farsly-input-helper farsly-input-helper--error">
                      {errors.category}
                    </span>
                  )}
                </div>

                {/* Price */}
                <Input
                  label="Price (USD)"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 16.90"
                  required
                  error={errors.price}
                />

                {/* Badge */}
                <div className="farsly-input-wrapper">
                  <label htmlFor="farsly-select-badge" className="farsly-input-label">
                    Badge
                  </label>
                  <select
                    id="farsly-select-badge"
                    name="badge"
                    value={formData.badge}
                    onChange={handleChange}
                    className="farsly-input-field farsly-inventory-select"
                  >
                    {BADGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image */}
                <div className="farsly-input-wrapper">
                  <label className="farsly-input-label">
                    Image {!editingItem && <span className="farsly-input-required">*</span>}
                  </label>

                  {formData.image ? (
                    <div className="farsly-inventory-image-preview-container">
                      <img
                        src={formData.image}
                        alt="Menu preview"
                        className="farsly-inventory-image-preview-upload"
                      />
                      <label className="farsly-inventory-image-change-btn">
                        Change Image
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="farsly-inventory-file-input-hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="farsly-inventory-file-upload-box">
                      <div className="farsly-inventory-file-upload-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="farsly-inventory-file-upload-text">Choose Image</span>
                        <span className="farsly-inventory-file-upload-hint">JPG, PNG or WEBP</span>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageUpload}
                        className="farsly-inventory-file-input-hidden"
                      />
                    </label>
                  )}
                  {errors.image && (
                    <span className="farsly-input-helper farsly-input-helper--error">
                      {errors.image}
                    </span>
                  )}
                </div>

                {/* Ingredients */}
                <Input
                  label="Ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Comma-separated: Salmon, Avocado, Ponzu"
                  helperText="Separate ingredients with commas."
                />

                {/* Calories */}
                <Input
                  label="Calories"
                  name="calories"
                  value={formData.calories}
                  onChange={handleChange}
                  placeholder="e.g. 520"
                />

                {/* Protein */}
                <Input
                  label="Protein"
                  name="protein"
                  value={formData.protein}
                  onChange={handleChange}
                  placeholder="e.g. 42g"
                />
              </div>

              {/* Description – full width */}
              <div className="farsly-input-wrapper farsly-inventory-form-full">
                <label htmlFor="farsly-textarea-description" className="farsly-input-label">
                  Description <span className="farsly-input-required">*</span>
                </label>
                <textarea
                  id="farsly-textarea-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this menu item..."
                  rows={3}
                  className={`farsly-input-field farsly-inventory-textarea ${errors.description ? 'farsly-input-field--error' : ''
                    }`}
                />
                {errors.description && (
                  <span className="farsly-input-helper farsly-input-helper--error">
                    {errors.description}
                  </span>
                )}
              </div>

              {/* Availability */}
              <label className="farsly-inventory-checkbox-label">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="farsly-inventory-checkbox"
                />
                <span>Available for ordering</span>
              </label>

              {/* Footer actions */}
              <div className="farsly-inventory-modal-footer">
                <Button variant="outline" onClick={closeFormModal}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
         DELETE CONFIRMATION MODAL
         ══════════════════════════════════════ */}
      {showDeleteModal && deletingItem && (
        <div className="farsly-inventory-modal-overlay" onClick={closeDeleteModal}>
          <div
            className="farsly-inventory-modal farsly-inventory-modal--small"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="farsly-inventory-modal-header">
              <h2 id="delete-modal-title" className="farsly-inventory-modal-title">
                Confirm Delete
              </h2>
              <button
                type="button"
                className="farsly-inventory-modal-close"
                onClick={closeDeleteModal}
                aria-label="Close dialog"
              >
                &times;
              </button>
            </div>
            <div className="farsly-inventory-delete-body">
              <p id="delete-modal-desc">
                Are you sure you want to delete{' '}
                <strong>&ldquo;{deletingItem.name}&rdquo;</strong>? This action cannot
                be undone.
              </p>
            </div>
            <div className="farsly-inventory-modal-footer" style={{ padding: '0 24px 24px' }}>
              <Button variant="outline" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
