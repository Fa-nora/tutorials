/** @odoo-module **/

export class MouseFollower {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.xp = 0;
        this.yp = 0;
        this._onMouseMove = this._onMouseMove.bind(this);
        this._animate = this._animate.bind(this);

        // اجرای اولیه هم‌زمان با بالا آمدن پوسته وب‌سایت
        this.init();
    }

    init() {
        // ساخت دایره
        this.follower = document.createElement('div');
        this.follower.setAttribute(
            'class',
            'x_mouse_follower o_not_editable position-fixed rounded-circle bg-o-color-1 opacity-50 translate-middle pe-none'
        );

        // پیدا کردن المان اصلی صفحه و اضافه کردن دایره تعقیب‌کننده به آن
        const mainEl = document.querySelector('#top + main');
        if (mainEl) {
            mainEl.append(this.follower);
        }


        const wrapper = document.querySelector('#wrapwrap');
        if (wrapper) {
            wrapper.addEventListener('mousemove', this._onMouseMove);
        }


        this.isAnimating = true;
        requestAnimationFrame(this._animate);
    }

    _onMouseMove(ev) {
        this.mouseX = ev.clientX;
        this.mouseY = ev.clientY;
    }

    // محاسبات حرکت نرم دایره به دنبال نشانگر ماوس
    _animate() {
        if (!this.isAnimating) return;

        // منطق حرکت تاخیری
        this.xp += (this.mouseX - this.xp) * 0.1;
        this.yp += (this.mouseY - this.yp) * 0.1;

        if (this.follower) {
            this.follower.style.top = `${this.yp}px`;
            this.follower.style.left = `${this.xp}px`;
        }

        requestAnimationFrame(this._animate);
    }

    // پاک‌سازی المان‌ها در صورت خروج از صفحه
    destroy() {
        this.isAnimating = false;

        const wrapper = document.querySelector('#wrapwrap');
        if (wrapper) {
            wrapper.removeEventListener('mousemove', this._onMouseMove);
        }

        if (this.follower) {
            this.follower.remove();
        }
    }
}


if (typeof window !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            window.oMouseFollower = new MouseFollower();
        });
    } else {
        window.oMouseFollower = new MouseFollower();
    }
}

export default MouseFollower;
